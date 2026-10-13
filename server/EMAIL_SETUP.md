# Transactional email setup (Resend)

1. Create a Resend account and add the domain you will use for sending.
2. Add the DNS records Resend displays for that domain at your DNS host. This normally includes domain verification and SPF/DKIM records; copy the exact record names and values from the Resend dashboard because they are specific to your domain.
3. Wait until Resend marks the domain verified. Use a sender address on that verified domain, such as `Edunexa <verify@your-domain.example>`.
4. Create a Resend API key with permission to send email. Set `RESEND_API_KEY` and `EMAIL_FROM` in the backend environment (Render or the local `server/.env`). Also configure `OTP_HASH_SECRET` as a long random secret and keep it stable; it is used to hash OTPs stored in MongoDB.
5. Restart the backend and request a signup code. A successful API response means Resend accepted the submission; it does not guarantee delivery to the recipient's inbox. Check Resend logs and the recipient's spam folder if needed.

Never commit `.env`, API keys, SMTP credentials, or other real credentials. The checked-in `.env.example` contains placeholders only.
