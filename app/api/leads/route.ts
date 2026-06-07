import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { LeadPayload } from "@/content/site";

export const runtime = "nodejs";

type LeadDeliveryStatus = "submitted_to_n8n" | "failed";

type LeadResponse = {
  ok: true;
  leadId: string;
  delivery: {
    database: "supabase";
    automation: "n8n";
    status: LeadDeliveryStatus;
  };
};

type ErrorResponse = {
  ok: false;
  error: string;
  message: string;
};

type LeadInsertRow = {
  object_type: string;
  work_type: string;
  height: string;
  urgency: string;
  name: string;
  phone: string;
  address: string | null;
  area: string | null;
  preferred_time: string | null;
  comment: string | null;
  source: string;
  status: "new";
  notification_status: "pending";
};

type LeadRecord = LeadInsertRow & {
  id: string;
  created_at: string;
};

const requiredFields: Array<keyof LeadPayload> = [
  "objectType",
  "workType",
  "height",
  "urgency",
  "name",
  "phone",
];

const MIN_SUBMIT_TIME_MS = 3000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const N8N_TIMEOUT_MS = 9000;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isValidPayload(payload: Partial<LeadPayload>) {
  return requiredFields.every((field) => {
    const value = payload[field];
    return typeof value === "string" && value.trim().length > 0;
  });
}

function jsonError(error: string, message: string, status: number) {
  const response: ErrorResponse = { ok: false, error, message };
  return NextResponse.json(response, { status });
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function isSpam(payload: Partial<LeadPayload>) {
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;

  return {
    honeypot: typeof payload.website === "string" && payload.website.trim().length > 0,
    tooFast: startedAt > 0 && Date.now() - startedAt < MIN_SUBMIT_TIME_MS,
  };
}

function required(value: string | undefined) {
  return value?.trim() ?? "";
}

function optional(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function getLeadsTableName() {
  return process.env.SUPABASE_LEADS_TABLE?.trim() || "leads";
}

function safeErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message.slice(0, 300);
  }

  if (typeof error === "string") {
    return error.slice(0, 300);
  }

  return "Unknown error";
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return "****";
  return `***${digits.slice(-4)}`;
}

async function updateLeadDeliveryStatus(
  leadId: string,
  status: "automation_started" | "failed",
  notificationStatus: "submitted_to_n8n" | "failed",
  notificationError: string | null,
) {
  const supabase = getSupabaseAdmin();
  const tableName = getLeadsTableName();
  const table = supabase.from(tableName) as any;

  const { error } = await table
    .update({
      status,
      notification_status: notificationStatus,
      notification_error: notificationError,
    })
    .eq("id", leadId);

  if (error) {
    console.error("Lead status update failed", {
      leadId,
      status,
      notificationStatus,
      error: error.message,
    });
  }
}

async function submitLeadToN8n(lead: LeadRecord) {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return {
      status: "failed" as const,
      error: "N8N_LEAD_WEBHOOK_URL is not configured",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-webhook-secret": process.env.N8N_LEAD_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify({
        lead: {
          id: lead.id,
          objectType: lead.object_type,
          workType: lead.work_type,
          height: lead.height,
          urgency: lead.urgency,
          name: lead.name,
          phone: lead.phone,
          address: lead.address ?? "",
          area: lead.area ?? "",
          preferredTime: lead.preferred_time ?? "",
          comment: lead.comment ?? "",
          source: lead.source,
          createdAt: lead.created_at,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");
      return {
        status: "failed" as const,
        error: `n8n responded with ${response.status}${responseText ? `: ${responseText.slice(0, 200)}` : ""}`,
      };
    }

    return { status: "submitted_to_n8n" as const, error: null };
  } catch (error) {
    return {
      status: "failed" as const,
      error: error instanceof DOMException && error.name === "AbortError" ? "n8n webhook timeout" : safeErrorMessage(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let payload: Partial<LeadPayload>;

  try {
    payload = await request.json();
  } catch {
    return jsonError("invalid_json", "Некорректный формат заявки.", 400);
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonError("rate_limited", "Слишком много заявок подряд. Попробуйте чуть позже.", 429);
  }

  const spam = isSpam(payload);

  if (spam.honeypot || spam.tooFast) {
    return jsonError("failed", "Заявка не прошла простую антиспам-проверку.", 400);
  }

  if (!isValidPayload(payload)) {
    return jsonError("missing_required_fields", "Заполните обязательные поля заявки.", 422);
  }

  const phone = required(payload.phone);
  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    return jsonError("invalid_phone", "Укажите корректный номер телефона.", 422);
  }

  const leadRow: LeadInsertRow = {
    object_type: required(payload.objectType),
    work_type: required(payload.workType),
    height: required(payload.height),
    urgency: required(payload.urgency),
    name: required(payload.name),
    phone,
    address: optional(payload.address),
    area: optional(payload.area),
    preferred_time: optional(payload.preferredTime),
    comment: optional(payload.comment),
    source: optional(payload.source) ?? "site_quiz",
    status: "new",
    notification_status: "pending",
  };

  let insertedLead: LeadRecord | null = null;

  try {
    const supabase = getSupabaseAdmin();
    const tableName = getLeadsTableName();
    const table = supabase.from(tableName) as any;

    const { data, error: insertError } = await table
      .insert(leadRow)
      .select("id, object_type, work_type, height, urgency, name, phone, address, area, preferred_time, comment, source, status, notification_status, created_at")
      .single();

    if (insertError || !data) {
      console.error("Lead insert failed", {
        error: insertError?.message ?? "No inserted lead returned",
        objectType: leadRow.object_type,
        workType: leadRow.work_type,
        phone: maskPhone(leadRow.phone),
      });

      return jsonError("database_error", "Не удалось сохранить заявку. Попробуйте позже.", 500);
    }

    insertedLead = data;
  } catch (error) {
    console.error("Lead insert failed", {
      error: safeErrorMessage(error),
      objectType: leadRow.object_type,
      workType: leadRow.work_type,
      phone: maskPhone(leadRow.phone),
    });

    return jsonError("database_error", "Не удалось сохранить заявку. Попробуйте позже.", 500);
  }

  if (!insertedLead) {
    return jsonError("database_error", "Не удалось сохранить заявку. Попробуйте позже.", 500);
  }

  const n8nResult = await submitLeadToN8n(insertedLead);

  if (n8nResult.status === "submitted_to_n8n") {
    await updateLeadDeliveryStatus(insertedLead.id, "automation_started", "submitted_to_n8n", null);
  } else {
    await updateLeadDeliveryStatus(insertedLead.id, "failed", "failed", n8nResult.error);
  }

  const response: LeadResponse = {
    ok: true,
    leadId: insertedLead.id,
    delivery: {
      database: "supabase",
      automation: "n8n",
      status: n8nResult.status,
    },
  };

  return NextResponse.json(response, { status: 202 });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: "supabase",
    language: "ru",
    storage: "supabase",
    automation: "n8n",
    notification: "telegram",
    webhookConfigured: Boolean(process.env.N8N_LEAD_WEBHOOK_URL),
    spamProtection: ["honeypot", "min_submit_time", "ip_rate_limit"],
    message: "Маршрут заявок сохраняет данные в Supabase и отправляет их в n8n.",
  });
}
