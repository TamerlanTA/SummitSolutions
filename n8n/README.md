# n8n Telegram workflow

Current MVP uses n8n Cloud and Telegram notifications. WhatsApp is planned later and is not used in this MVP.

## Production webhook

Use the production n8n webhook URL:

```txt
https://aslanii4.app.n8n.cloud/webhook/summit-lead
```

Webhook settings:

- Method: `POST`
- Path: `summit-lead`
- Workflow must be active.
- Use `/webhook/summit-lead`, not `/webhook-test/summit-lead`, for the website backend.

## Workflow structure

```txt
Webhook: summit-lead
  ↓
Validate secret
  ↓
Build Telegram message
  ↓
Send Telegram message
  ↓
IF Telegram success?
  ↓                    ↓
Update Supabase sent   Update Supabase failed
  ↓                    ↓
Respond success        Respond failed
```

## Import workflow

1. Open n8n Cloud.
2. Go to `Workflows`.
3. Choose `Import from File`.
4. Select `n8n/summit-lead-telegram-workflow.json`.
5. Open the imported workflow.
6. Check each node for validation warnings.
7. Add credentials/env variables.
8. Activate the workflow.

If your n8n version changes node parameters during import, manually check:

- `Lead Webhook`: `POST`, path `summit-lead`, response via Respond to Webhook node.
- `Send Telegram Message`: `POST`, JSON body, no `parse_mode`, continue on fail / never error.
- Supabase PATCH nodes: headers enabled, JSON body, `Prefer: return=representation`.

## Incoming payload

The Next.js backend sends:

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

Optional fields can be empty strings. The workflow prints `—` for empty `address`, `area`, `preferredTime`, and `comment`.

## Secret validation

The backend sends this header:

```txt
x-lead-webhook-secret: YOUR_RANDOM_SECRET
```

n8n should compare that value with the same secret.

If n8n Cloud environment variables are not available, the secret can temporarily be hardcoded inside the `Validate Webhook Secret` IF node while testing. Do not commit real secrets to GitHub.

## n8n Cloud environment

n8n Cloud needs:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
N8N_LEAD_WEBHOOK_SECRET=
```

The Supabase service role key must never be exposed to browser/client-side code.

## Telegram setup

For direct messages:

1. Open Telegram.
2. Message `@BotFather`.
3. Run `/newbot`.
4. Create the bot and copy the bot token.
5. Save the token as `TELEGRAM_BOT_TOKEN` in n8n Cloud.
6. Start a chat with the bot and press `Start`.
7. Send any message to the bot.
8. Open:

```txt
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates
```

9. Copy `chat.id`.
10. Save it as `TELEGRAM_CHAT_ID`.

For a Telegram group:

1. Create a Telegram group.
2. Add the bot to the group.
3. Send a test message in the group.
4. Open `getUpdates`.
5. Copy the group `chat.id`; group ids usually start with `-`.
6. Use that value as `TELEGRAM_CHAT_ID`.

The MVP workflow uses plain text and does not set Telegram `parse_mode`, so user input does not need HTML escaping.

## Next.js local `.env.local`

Next.js only needs Supabase and n8n variables:

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

## Vercel environment

Vercel must have:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_LEADS_TABLE=leads
N8N_LEAD_WEBHOOK_URL=https://aslanii4.app.n8n.cloud/webhook/summit-lead
N8N_LEAD_WEBHOOK_SECRET=
```

Do not use `NEXT_PUBLIC_` for these secrets.

## Local backend test

Run Next.js locally, then test `/api/leads`:

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

The real test should be through `/api/leads`, because the backend creates the Supabase row before calling n8n.

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

Direct n8n testing may fail the Supabase update if the UUID does not exist in the table.

Expected success response:

```json
{
  "ok": true,
  "status": "sent",
  "leadId": "00000000-0000-0000-0000-000000000000"
}
```

Expected Telegram failure response:

```json
{
  "ok": false,
  "status": "failed",
  "leadId": "00000000-0000-0000-0000-000000000000",
  "error": "Telegram send failed"
}
```

Expected unauthorized response:

```json
{
  "ok": false,
  "error": "Unauthorized"
}
```
