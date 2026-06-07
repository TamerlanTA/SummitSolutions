import { NextResponse } from "next/server";
import type { LeadPayload } from "@/content/site";

export const runtime = "nodejs";

type LeadResponse = {
  ok: true;
  leadId: string;
  mode: "stub";
  delivery: {
    database: "supabase";
    automation: "n8n";
    messenger: "whatsapp_cloud_api";
    target: "whatsapp_group";
    status: "prepared";
  };
};

type ErrorResponse = {
  ok: false;
  error: string;
  message: string;
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

function optional(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
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

  const phoneDigits = payload.phone!.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    return jsonError("invalid_phone", "Укажите корректный номер телефона.", 422);
  }

  const normalizedPayload: LeadPayload = {
    objectType: payload.objectType!.trim(),
    workType: payload.workType!.trim(),
    height: payload.height!.trim(),
    urgency: payload.urgency!.trim(),
    name: payload.name!.trim(),
    phone: payload.phone!.trim(),
    address: optional(payload.address),
    area: optional(payload.area),
    preferredTime: optional(payload.preferredTime),
    comment: optional(payload.comment),
    source: optional(payload.source) || "site_quiz",
  };

  const leadId = crypto.randomUUID();

  // Реальный backend пока не подключен.
  // План подключения:
  // 1. Сохранить leadId и normalizedPayload в Supabase.
  // 2. Передать заявку в n8n webhook.
  // 3. Через WhatsApp Cloud API отправить уведомление в рабочую группу.
  // 4. При ошибке вернуть failed и залогировать причину для уведомления владельцу.
  console.info("Prepared lead payload", {
    leadId,
    objectType: normalizedPayload.objectType,
    workType: normalizedPayload.workType,
    address: normalizedPayload.address,
    area: normalizedPayload.area,
    preferredTime: normalizedPayload.preferredTime,
    source: normalizedPayload.source,
  });

  const response: LeadResponse = {
    ok: true,
    leadId,
    mode: "stub",
    delivery: {
      database: "supabase",
      automation: "n8n",
      messenger: "whatsapp_cloud_api",
      target: "whatsapp_group",
      status: "prepared",
    },
  };

  return NextResponse.json(response, { status: 202 });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: "stub",
    language: "ru",
    storage: "supabase",
    automation: "n8n",
    messenger: "whatsapp_cloud_api",
    target: "whatsapp_group",
    spamProtection: ["honeypot", "min_submit_time", "ip_rate_limit"],
    message: "Маршрут заявок подготовлен. Supabase, n8n и WhatsApp Cloud API пока не подключены.",
  });
}
