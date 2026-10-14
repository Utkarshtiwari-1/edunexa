import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Otpsender, Signupuser } from "../service/operations";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// "johndoe@gmail.com" -> "jo*****@gmail.com"
function maskEmail(email = "") {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 3))}@${domain}`;
}

function Otpverification() {
  const [otp, setotp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const { formdata } = useSelector((state) => state.profile);
  // Optional: if your auth slice exposes a loading flag it is used, otherwise false
  const loading = useSelector((state) => state.auth?.loading) ?? false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { FirstName, LastName, email, password, confirmpassword, accountType } =
    formdata || {};

  const isComplete = otp.length === OTP_LENGTH;
  const canResend = secondsLeft === 0 && !loading;

  // A page refresh wipes redux state -> send the user back to signup
  useEffect(() => {
    if (!formdata) navigate("/signup", { replace: true });
  }, [formdata, navigate]);

  // Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  if (!formdata) return null;

  function signupclickhandler(event) {
    event.preventDefault();
    if (!isComplete || loading) return;
    dispatch(
      Signupuser(
        FirstName,
        LastName,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
        navigate
      )
    );
  }

  function resendHandler() {
    if (!canResend) return;
    setotp("");
    setSecondsLeft(RESEND_SECONDS);
    dispatch(Otpsender(email, navigate));
  }

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] grid place-items-center px-4 py-10 overflow-hidden">
      {/* soft background glow, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-50/10 blur-3xl"
      />

      <div className="relative w-full max-w-[28rem] rounded-2xl border border-richblack-700 bg-richblack-800/70 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur sm:p-10">
        {/* icon */}
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-yellow-50/10 ring-1 ring-yellow-50/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-yellow-50"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </div>

        {/* heading */}
        <h1 className="text-center text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Verify your email
        </h1>
        <p className="mx-auto mt-3 max-w-[22rem] text-center text-base leading-6 text-richblack-100">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-richblack-5">{maskEmail(email)}</span>.
          Enter it below to finish creating your account.
        </p>

        {/* form */}
        <form onSubmit={signupclickhandler} className="mt-8" noValidate>
          <label htmlFor="otp-group" className="sr-only">
            Verification code
          </label>

          <div id="otp-group" role="group" aria-label="Verification code">
            <OTPInput
              value={otp}
              onChange={(value) => setotp(value.replace(/\D/g, ""))}
              numInputs={OTP_LENGTH}
              inputType="tel"
              shouldAutoFocus
              renderInput={(props, index) => (
                <input
                  {...props}
                  placeholder="–"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                  disabled={loading}
                  className={`!w-full aspect-square min-w-0 rounded-lg border-0 bg-richblack-900 text-center text-xl font-semibold text-richblack-5 caret-yellow-50 outline-none transition placeholder:text-richblack-500 disabled:opacity-50 sm:text-2xl
                    ring-1 focus:ring-2 focus:ring-yellow-50 focus:shadow-[0_0_0_4px_rgba(255,214,10,0.12)]
                    ${
                      props.value
                        ? "ring-yellow-50/60"
                        : "ring-richblack-600"
                    }`}
                />
              )}
              containerStyle={{ display: "flex", gap: "0.5rem" }}
            />
          </div>

          <button
            type="submit"
            disabled={!isComplete || loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-50 px-3 py-3 font-medium text-richblack-900 transition hover:brightness-105 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-50 focus-visible:ring-offset-2 focus-visible:ring-offset-richblack-800 disabled:cursor-not-allowed disabled:bg-richblack-700 disabled:text-richblack-400 disabled:hover:brightness-100 disabled:active:scale-100"
          >
            {loading && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 0 1 8-8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {loading ? "Verifying…" : "Verify email"}
          </button>
        </form>

        {/* footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-richblack-700 pt-5 text-sm">
          <Link
            to="/login"
            className="flex items-center gap-x-1.5 text-richblack-100 transition hover:text-richblack-5 focus:outline-none focus-visible:underline"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to login
          </Link>

          <button
            type="button"
            onClick={resendHandler}
            disabled={!canResend}
            aria-live="polite"
            className="font-medium text-yellow-50 transition hover:underline focus:outline-none focus-visible:underline disabled:cursor-not-allowed disabled:text-richblack-400 disabled:no-underline"
          >
            {canResend ? "Resend code" : `Resend in ${secondsLeft}s`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otpverification;