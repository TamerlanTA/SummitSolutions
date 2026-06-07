# Leads backend MVP

The website lead form posts to `/api/leads`.

Current MVP flow:

1. Next.js validates the form payload.
2. Next.js saves the lead in Supabase.
3. Next.js calls the n8n Cloud webhook.
4. n8n sends a Telegram notification.
5. n8n updates the Supabase lead row to `sent` or `failed`.
6. The frontend shows success if the lead was saved, even when notification delivery failed.

## Supabase SQL

Run this SQL in the Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),

  object_type text not null,
  work_type text not null,
  height text not null,
  urgency text not null,

  name text not null,
  phone text not null,

  address text null,
  area text null,
  preferred_time text null,
  comment text null,

  source text not null default 'site_quiz',

  status text not null default 'new',
  notification_status text not null default 'pending',
  notification_error text null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
on public.leads (created_at desc);

create index if not exists leads_status_idx
on public.leads (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;

create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();
```

## Lead statuses

- `new`: saved in Supabase.
- `automation_started`: n8n webhook accepted the lead.
- `notified`: Telegram notification sent.
- `failed`: n8n or Telegram failed.

## Notification statuses

- `pending`
- `submitted_to_n8n`
- `sent`
- `failed`

## Local `.env.local`

Next.js local development needs Supabase and n8n variables:

```env
LEADS_BACKEND_MODE=supabase
LEADS_LANGUAGE=ru

SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
SUPABASE_LEADS_TABLE=leads

N8N_LEAD_WEBHOOK_URL=https://aslanii4.app.n8n.cloud/webhook/summit-lead
N8N_LEAD_WEBHOOK_SECRET=YOUR_RANDOM_SECRET
```

Telegram token and chat id are used in n8n Cloud, not necessarily in the Next.js app.

## n8n Cloud environment

n8n Cloud needs:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
N8N_LEAD_WEBHOOK_SECRET=
```

If n8n Cloud environment variables are not available on your plan/workspace, temporarily hardcode the values inside the n8n nodes while testing. Do not commit secrets to GitHub.

## Vercel environment

Vercel must have the same backend env variables as local Next.js:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_LEADS_TABLE=leads
N8N_LEAD_WEBHOOK_URL=https://aslanii4.app.n8n.cloud/webhook/summit-lead
N8N_LEAD_WEBHOOK_SECRET=
```

Never use `NEXT_PUBLIC_` for `SUPABASE_SERVICE_ROLE_KEY`, `N8N_LEAD_WEBHOOK_SECRET`, or Telegram secrets. These values must stay server-side.

## Backend payload to n8n

After saving a lead, `/api/leads` sends this to n8n:

```json
{
  "lead": {
    "id": "uuid",
    "objectType": "Дом",
    "workType": "Мойка фасада",
    "height": "до 10 м",
    "urgency": "На этой неделе",
    "name": "Client name",
    "phone": "+420123456789",
    "address": "",
    "area": "",
    "preferredTime": "",
    "comment": "",
    "source": "site_quiz",
    "createdAt": "2026-06-07T12:00:00.000Z"
  }
}
```

The backend sends this header:

```txt
x-lead-webhook-secret: YOUR_RANDOM_SECRET
```

## Local backend test

Run the Next.js dev server first:

```bash
npm run dev
```

Then submit a test lead:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "objectType": "Дом",
    "workType": "Мойка фасада",
    "height": "до 10 м",
    "urgency": "На этой неделе",
    "name": "Тест",
    "phone": "+420123456789",
    "address": "",
    "area": "",
    "preferredTime": "",
    "comment": "",
    "source": "manual_test",
    "startedAt": 0
  }'
```

`startedAt: 0` bypasses the minimum submit time check for manual API testing.

## Direct n8n webhook test

```bash
curl -X POST https://aslanii4.app.n8n.cloud/webhook/summit-lead \
  -H "Content-Type: application/json" \
  -H "x-lead-webhook-secret: YOUR_RANDOM_SECRET" \
  -d '{
    "lead": {
      "id": "00000000-0000-0000-0000-000000000000",
      "objectType": "Дом",
      "workType": "Мойка фасада",
      "height": "до 10 м",
      "urgency": "На этой неделе",
      "name": "Тест",
      "phone": "+420123456789",
      "address": "",
      "area": "",
      "preferredTime": "",
      "comment": "",
      "source": "manual_test",
      "createdAt": "2026-06-07T12:00:00.000Z"
    }
  }'
```

Direct n8n testing may fail the Supabase update if the UUID does not exist in the table. The real test should be through `/api/leads`, because the backend creates the Supabase row first.
