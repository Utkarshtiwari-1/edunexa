# Edunexa

<<<<<<< HEAD
Edunexa is a course learning platform built with React and Express. Students can browse and enroll in courses, watch lessons, and track progress. Instructors can create and manage courses. The backend uses MongoDB, JWT authentication, Cloudinary uploads, Razorpay payments, and Resend for transactional email.
=======
Edunexa is a course learning platform built with React and Express. Students can browse and enroll in courses, watch lessons, and track progress. Instructors can create and manage courses. The backend uses MongoDB, JWT authentication, Cloudinary uploads, Razorpay payments, and Brevo's HTTPS API for transactional email.
>>>>>>> 906d3a1 (email sending issue resolved)

## Features

- Student and instructor registration with email OTP verification
- Login, password reset, and authenticated account settings
- Course catalog, sections, lessons, ratings, and progress tracking
- Instructor course management and dashboards
- Razorpay course payments
- Cloudinary media and profile image uploads

## Technology

- Frontend: React 18, React Router, Redux Toolkit, Tailwind CSS
- Backend: Node.js 20, Express, Mongoose
<<<<<<< HEAD
- Email: Resend Node.js SDK
=======
- Email: Brevo transactional email API over HTTPS
>>>>>>> 906d3a1 (email sending issue resolved)
- Database: MongoDB

## Requirements

- Node.js 20.x and npm
- A MongoDB database
<<<<<<< HEAD
- Resend account and a verified sender domain for email
=======
- Brevo account, API key, and verified sender for email
>>>>>>> 906d3a1 (email sending issue resolved)
- Cloudinary and Razorpay credentials for uploads and payments

## Local setup

Install dependencies from the repository root and the backend directory:

```bash
npm install
cd server
npm install
```

Create `server/.env` from the example if it does not already exist:

```bash
cp .env.example .env
```

If `server/.env` already exists, edit it in place; do not overwrite it with the example. Fill in the required values:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `OTP_HASH_SECRET` | Separate, long random secret used to hash OTPs; keep it stable |
| `CLIENT_URL` | Frontend origin, used for CORS and password reset links |
<<<<<<< HEAD
| `RESEND_API_KEY` | Resend API key, usually begins with `re_` |
| `EMAIL_FROM` | Sender on your verified domain, e.g. `Edunexa <verify@edunexa.com>` |
=======
| `BREVO_API_KEY` | Brevo API key from **SMTP & API → API keys** |
| `EMAIL_FROM` | Sender verified in Brevo, e.g. `Edunexa <you@example.com>` |
>>>>>>> 906d3a1 (email sending issue resolved)
| `CLOUD_NAME`, `API_KEY`, `API_SECRET` | Cloudinary credentials |
| `RAZORPAY_ID`, `RAZORPAY_SECRET` | Razorpay credentials |
| `FOLDER_NAME` | Cloudinary folder name (optional) |

<<<<<<< HEAD
Email setup, including domain DNS verification, is documented in [`server/EMAIL_SETUP.md`](server/EMAIL_SETUP.md). Resend must show the sender domain as verified before the provider will accept mail from it. A successful API response means Resend accepted the email submission; it does not guarantee inbox delivery.
=======
See [`server/EMAIL_SETUP.md`](server/EMAIL_SETUP.md) for configuring Brevo. It sends over HTTPS, so it works on Render Free. The free plan currently includes 300 emails per day. Without a domain you own, Brevo may replace a Gmail sender with a Brevo-managed From address.
>>>>>>> 906d3a1 (email sending issue resolved)

Start the frontend and backend together from the repository root:

```bash
npm run dev
```

Or start them in separate terminals:

```bash
# Terminal 1, repository root
npm start

# Terminal 2
cd server
npm run dev
```

The frontend runs at `http://localhost:3000`; the backend runs at `http://localhost:4000`. Check backend and database connectivity at `http://localhost:4000/health`.

In development, the frontend uses the local backend by default. To use a different API, create a root `.env` file and set the URL before starting or building the frontend:

```env
REACT_APP_API_BASE_URL=http://localhost:4000/api/v1
```

For a deployed frontend, set `REACT_APP_API_BASE_URL` to the deployed backend API URL (for example, `https://api.example.com/api/v1`) in the frontend hosting environment and rebuild the frontend. The production default currently points to the Edunexa Render API.

## Tests and production build

Run backend tests:

```bash
cd server
npm test
```

Build the frontend for production from the repository root:

```bash
npm run build
```

## API routes

All API routes are under `/api/v1`.

| Area | Base route |
| --- | --- |
| User authentication, OTP, password reset | `/user` |
| Courses | `/courses` |
| Payments | `/payments` |
| Profiles | `/profile` |

Important auth endpoints include `POST /user/sendotp`, `POST /user/signup`, `POST /user/login`, `POST /user/resetpassword-token`, and `POST /user/resetpassword`.

## Security notes

- Keep `.env` files and real provider credentials out of Git. Use hosting-provider environment settings in production.
- Use a strong, unique `JWT_SECRET` and `OTP_HASH_SECRET`.
- Signup OTPs are stored as hashes, expire after five minutes, allow a limited number of verification attempts, and are invalidated after successful use.
- OTP resend requests are rate-limited. Do not share verification codes.
