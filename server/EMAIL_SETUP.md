# Brevo email API setup for Render

The backend sends OTP and account emails through Brevo's HTTPS transactional email API. It uses outbound HTTPS, so it works with Render Free, which blocks SMTP ports.

1. Create a free Brevo account and enable transactional email.
2. In **Settings → Senders, Domains, IPs → Senders**, add an email address you control and complete its verification.
3. In **SMTP & API → API keys**, create an API key.
4. Add these variables to `server/.env` for local development and to your Render backend service's environment settings for deployment:

   ```env
   BREVO_API_KEY=your-brevo-api-key
   EMAIL_FROM=Edunexa <your-verified-sender@example.com>
   ```

   Set `EMAIL_FROM` to the sender address verified in Brevo. Do not set Gmail SMTP variables for this mailer.
5. Restart/redeploy the backend and request an OTP. A successful API response means Brevo accepted the message; check Brevo's transactional logs and the recipient's spam folder to confirm delivery.

Brevo's free plan currently includes **300 email sends per day**. Without a domain you own and authenticate, Brevo may replace a free-email sender address (such as Gmail) with a Brevo-managed sender address. This avoids the need to buy a domain for testing, but the visible From address may not be your Gmail address and deliverability may be reduced.

References: [Brevo send transactional email API](https://developers.brevo.com/reference/send-transac-email), [Brevo free plan limits](https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan), and [Brevo sender authentication guidance](https://help.brevo.com/hc/en-us/articles/17286219877778-FAQs-About-domain-authentication-Brevo-code-DKIM-DMARC).

Never commit `.env` files or credentials. Store production values in Render's environment settings, not source control.
