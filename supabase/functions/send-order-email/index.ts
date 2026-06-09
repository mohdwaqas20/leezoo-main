import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY') ?? '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'shop@leezoo.in';
const FROM_NAME = 'LEEZOO';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to_email, to_name, order_id, items, total, address, payment_method } =
      await req.json();

    // ── Build items table rows ─────────────────────────────────────────────
    const itemRows = (items ?? [])
      .map(
        (i: { name: string; size: string; qty: number; price: number }) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f0ece4;">
            ${i.name} <span style="color:#9b8b78;font-size:12px;">(${i.size})</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #f0ece4;text-align:center;color:#9b8b78;">
            ×${i.qty}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #f0ece4;text-align:right;font-weight:500;">
            ₹${i.price * i.qty}
          </td>
        </tr>`
      )
      .join('');

    // ── HTML email template ────────────────────────────────────────────────
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed — ${order_id}</title>
</head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1614;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1614;padding:32px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:700;letter-spacing:0.2em;color:#f7f4ef;">
                LEEZOO
              </div>
            </td>
          </tr>

          <!-- Gold bar -->
          <tr>
            <td style="background:#bfa06a;height:3px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <p style="font-size:22px;font-weight:600;margin:0 0 8px;">
                Order Confirmed ✓
              </p>
              <p style="font-size:14px;color:#7a6b5d;margin:0 0 28px;">
                Hi ${to_name}, thank you for your order. We'll get it ready for you soon.
              </p>

              <!-- Order ID pill -->
              <div style="background:#f7f4ef;border:1px solid #e8e0d4;border-radius:4px;padding:14px 20px;margin-bottom:28px;">
                <span style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9b8b78;">Order ID</span>
                <span style="float:right;font-size:14px;font-weight:600;color:#bfa06a;letter-spacing:0.05em;">${order_id}</span>
              </div>

              <!-- Items table -->
              <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9b8b78;margin:0 0 12px;">
                Items Ordered
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                ${itemRows}
                <tr>
                  <td colspan="2" style="padding:12px 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9b8b78;">
                    Total
                  </td>
                  <td style="padding:12px 0 4px;text-align:right;font-size:18px;font-weight:700;color:#bfa06a;">
                    ₹${total}
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #f0ece4;margin:24px 0;">

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;vertical-align:top;width:50%;">
                    <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9b8b78;margin-bottom:4px;">
                      Delivering To
                    </div>
                    <div style="font-size:13px;line-height:1.6;color:#1a1614;">${address}</div>
                  </td>
                  <td style="padding-bottom:16px;vertical-align:top;padding-left:24px;">
                    <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9b8b78;margin-bottom:4px;">
                      Payment
                    </div>
                    <div style="font-size:13px;color:#1a1614;">${payment_method}</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f4ef;padding:24px 40px;text-align:center;border-top:1px solid #e8e0d4;">
              <p style="font-size:12px;color:#9b8b78;margin:0 0 6px;">
                Questions? Email us at leezoo.official2026@gmail.com or WhatsApp: +91-9984090593          </p>
              <p style="font-size:11px;color:#c4b9aa;margin:0;">
                © ${new Date().getFullYear()} LEEZOO. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    // ── Call Brevo API ─────────────────────────────────────────────────────
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: to_email, name: to_name }],
        subject: `Your LEEZOO order is confirmed — ${order_id}`,
        htmlContent,
      }),
    });

    if (!brevoRes.ok) {
      const err = await brevoRes.text();
      throw new Error(`Brevo error ${brevoRes.status}: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('send-order-email error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});