"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { login } from "@/features/auth/api/auth";
import { FlowMeta, Icon } from "@/components/sketchbot/primitives";
import { FLOW_IDS, ROUTES } from "@/lib/routes";

type Phase = "request" | "reset" | "done";

/** Read `exp` (seconds) from a JWT payload without verifying it. */
function tokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

function entropyBits(pw: string): number {
  if (!pw) return 0;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  return Math.round(pw.length * Math.log2(pool || 1) * 10) / 10;
}

function entropyLevel(bits: number): { ticks: number; label: string } {
  if (bits >= 80) return { ticks: 4, label: "MAXIMUM TELEMETRIC ENTROPY" };
  if (bits >= 60) return { ticks: 3, label: "STRONG TELEMETRIC ENTROPY" };
  if (bits >= 40) return { ticks: 2, label: "MODERATE ENTROPY" };
  if (bits > 0) return { ticks: 1, label: "WEAK ENTROPY" };
  return { ticks: 0, label: "AWAITING INPUT" };
}


function RecoveryInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialToken = params.get("token") ?? "";

  const [phase, setPhase] = useState<Phase>(initialToken ? "reset" : "request");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const tokenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  const exp = useMemo(() => (token ? tokenExpiry(token) : null), [token]);
  const remaining = exp ? Math.max(0, exp - now) : null;
  const expLabel =
    remaining === null
      ? "[EXP: --:--]"
      : `[EXP: ${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}]`;

  const bits = entropyBits(password);
  const level = entropyLevel(bits);
  const match = confirm.length > 0 && confirm === password;

  const cells = Array.from({ length: 6 }, (_, i) => token.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()[i] ?? "");
  const activeCell = cells.findIndex((c) => !c);

  const requestToken = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) {
      setError("Enter the email tied to your workspace");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await apiFetch<{ message: string }>("/api/v1/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      setNotice("Recovery token dispatched. Check your inbox.");
      setPhase("reset");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setBusy(false);
    }
  };

  const submitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setError("Paste the verification token from your email");
    if (password.length < 8) return setError("Secret key must be at least 8 characters");
    if (!match) return setError("Secret keys do not match");
    setBusy(true);
    setError(null);
    try {
      await apiFetch<{ message: string }>("/api/v1/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: token.trim(), newPassword: password }),
      });
      setPhase("done");
      if (email) {
        try {
          await login(email, password);
          router.push(ROUTES.dashboard);
          router.refresh();
          return;
        } catch {
          /* fall through to login page */
        }
      }
      setTimeout(() => router.push(ROUTES.login), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setBusy(false);
    }
  };

  const step = phase === "request" ? 1 : phase === "reset" ? 2 : 3;
  const stepClass = (n: number) => (step > n ? "text-primary-container" : step === n ? "text-primary" : "text-outline");

  return (
    <div className="sb-root bg-surface font-body-md text-on-surface flex flex-col min-h-screen pt-safe pb-safe">
      <FlowMeta
        flowId={FLOW_IDS.recovery}
        route={ROUTES.recovery}
        parentRoute={ROUTES.login}
        device="mobile_stack"
        stateDependency={["useAuthStore", "useRecoveryFlow"]}
      />
      <main className="flex flex-col relative w-full bg-surface min-h-screen items-center">
        <div className="flex flex-col w-full max-w-md text-on-surface">
          <div className="px-margin-mobile flex flex-col space-y-space-md pb-space-xl">
            <div className="flex items-center justify-between py-space-xs">
              <div className="flex items-center space-x-space-sm">
                <button
                  aria-label="Return to login screen"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95 text-on-surface"
                  data-testid="forgot-back-login"
                  onClick={() => router.push(ROUTES.login)}
                  type="button"
                >
                  <Icon name="arrow_back" className="text-[18px]" />
                </button>
                <div className="flex flex-col">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">Security Recovery</span>
                  <span className="font-annotation text-annotation text-primary-container tracking-wider uppercase opacity-90">
                    [ PROTOCOL: KEY_RESET // REV 2.4 ]
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-surface-container-lowest">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-widest">LIVE_SYS</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col space-y-2">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <div className={`flex items-center space-x-1 ${stepClass(1)}`}>
                  {step > 1 ? (
                    <Icon name="check_circle" className="text-[14px]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" />
                  )}
                  <span className="font-label-md text-label-md">01 Email Sent</span>
                </div>
                <div className={`flex items-center space-x-1 ${stepClass(2)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${step === 2 ? "bg-primary-container animate-ping" : step > 2 ? "bg-primary-container" : "bg-outline"}`} />
                  <span className={`font-label-md text-label-md ${step === 2 ? "font-semibold" : ""}`}>02 Verify &amp; Pass</span>
                </div>
                <div className={`flex items-center space-x-1 ${stepClass(3)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${step === 3 ? "bg-primary-container" : "bg-outline"}`} />
                  <span className="font-label-md text-label-md">03 Handshake</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 h-1 w-full">
                <div className="bg-primary-container rounded-full h-full" />
                <div className={`rounded-full h-full relative overflow-hidden ${step >= 2 ? "bg-primary-container" : "bg-surface-container-highest"}`}>
                  {step === 2 && <div className="absolute inset-0 bg-primary opacity-60 animate-pulse" />}
                </div>
                <div className={`rounded-full h-full ${step === 3 ? "bg-primary-container" : "bg-surface-container-highest"}`} />
              </div>
            </div>

            <div className="relative bg-surface-container-low p-space-md rounded-lg flex flex-col space-y-space-md shadow-xl overflow-hidden">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-br-sm pointer-events-none" />

              <div className="flex items-start space-x-space-sm pt-1">
                <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                  <div className="relative flex items-center justify-center text-primary-container">
                    <Icon name="shield_lock" className="text-[24px]" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="font-headline-md text-headline-md text-on-surface truncate">Reset Workspace Access</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                    {phase === "request" ? (
                      "Enter your workspace email to receive a recovery token."
                    ) : (
                      <>
                        Enter the token beamed to <span className="text-primary font-label-md">{email || "your inbox"}</span> to decrypt keypair.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {phase === "request" && (
                <form className="flex flex-col space-y-space-sm" onSubmit={requestToken} noValidate>
                  <label className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1" htmlFor="recovery-email">
                    <span className="text-primary-container">@</span> Work Email
                  </label>
                  <input
                    id="recovery-email"
                    data-testid="auth-email"
                    type="email"
                    autoComplete="email"
                    placeholder="operator@sketchbot.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none focus:bg-surface-container-highest transition-colors"
                  />
                  {error && <ErrorLine message={error} />}
                  <button
                    className="w-full bg-primary-fixed text-on-primary-fixed py-3 rounded-full font-headline-md text-label-lg font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-60"
                    data-testid="forgot-submit"
                    disabled={busy}
                    type="submit"
                  >
                    <span>{busy ? "Dispatching..." : "Send Recovery Token"}</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhase("reset")}
                    className="font-label-md text-label-md text-secondary hover:text-on-surface tracking-wider uppercase transition-colors"
                  >
                    [ I ALREADY HAVE A TOKEN ]
                  </button>
                </form>
              )}

              {phase !== "request" && (
                <form className="flex flex-col space-y-space-md" onSubmit={submitReset} noValidate>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1">
                        <span className="text-primary-container">§</span> Verification Hex Code
                      </label>
                      <span className="font-annotation text-annotation text-primary-container">{expLabel}</span>
                    </div>
                    <div
                      aria-label="6 Character Verification Code Input"
                      className="relative grid grid-cols-6 gap-2 w-full pt-1 cursor-text"
                      data-testid="verification-code-input"
                      role="group"
                      onClick={() => tokenInput.current?.focus()}
                    >
                      {cells.map((c, i) => (
                        <div
                          key={i}
                          className={`h-12 rounded flex items-center justify-center font-headline-md text-headline-md ${
                            c
                              ? "bg-surface-container-high text-primary"
                              : i === activeCell
                                ? "bg-surface-container-highest text-primary-container"
                                : "bg-surface-container text-outline"
                          }`}
                        >
                          {c ? (
                            c
                          ) : i === activeCell ? (
                            <span className="w-2.5 h-6 bg-primary-container animate-pulse rounded-xs" />
                          ) : (
                            <span className="w-2 h-0.5 bg-outline opacity-40 rounded" />
                          )}
                        </div>
                      ))}
                      <input
                        ref={tokenInput}
                        aria-label="Paste verification token"
                        className="absolute inset-0 opacity-0 cursor-text"
                        value={token}
                        onChange={(e) => setToken(e.target.value.trim())}
                        autoComplete="one-time-code"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="font-annotation text-annotation text-on-surface-variant">
                        {token ? `TOKEN: ${token.length} CHARS LOADED` : "PASTE THE TOKEN FROM YOUR EMAIL"}
                      </span>
                      <button
                        className="font-label-md text-label-md text-primary-container hover:underline tracking-tight flex items-center gap-1 disabled:opacity-50"
                        disabled={busy || !email}
                        onClick={() => requestToken()}
                        type="button"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                        Resend token
                      </button>
                    </div>
                  </div>

                  {!email && (
                    <input
                      aria-label="Work email"
                      placeholder="operator@sketchbot.io (optional, for auto sign-in)"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none focus:bg-surface-container-highest transition-colors"
                    />
                  )}

                  <div className="flex flex-col space-y-space-sm pt-2">
                    <div className="flex flex-col space-y-1">
                      <label
                        className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1"
                        htmlFor="reset-new-password"
                      >
                        <span className="text-primary-container">#</span> New Secret Key / Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none pr-10 focus:bg-surface-container-highest transition-colors"
                          data-testid="reset-new-password"
                          id="reset-new-password"
                          placeholder="Min. 8 characters..."
                          type={show ? "text" : "password"}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          aria-label="Toggle password visibility"
                          className="absolute right-3 text-secondary hover:text-primary-container transition-colors"
                          type="button"
                          onClick={() => setShow((s) => !s)}
                        >
                          <Icon name={show ? "visibility_off" : "visibility"} className="text-[18px]" />
                        </button>
                      </div>
                      <div className="pt-1 flex flex-col space-y-1">
                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                          <span className="text-primary-container tracking-wider font-semibold">{level.label}</span>
                          <span className="font-annotation text-annotation text-secondary">{bits.toFixed(1)} BITS</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`${i < level.ticks ? "bg-primary-container" : "bg-surface-container-highest"} rounded-full h-full`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 pt-1">
                      <label
                        className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1"
                        htmlFor="reset-confirm-password"
                      >
                        <span className="text-primary-container">#</span> Confirm Secret Key
                      </label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none pr-10 focus:bg-surface-container-highest transition-colors"
                          data-testid="reset-confirm-password"
                          id="reset-confirm-password"
                          placeholder="Re-enter secret passphrase"
                          type={show ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                        />
                        {match && (
                          <div className="absolute right-3 flex items-center text-primary-container">
                            <Icon name="check_circle" className="text-[18px]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-end px-2 py-1">
                    <svg className="w-8 h-6 text-primary-container opacity-80 mr-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 24">
                      <path d="M4 20 C12 22, 22 16, 26 4" strokeLinecap="round" />
                      <path d="M20 4 L26 4 L26 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-annotation text-annotation text-primary-fixed tracking-tight italic">keys hash on the server before storage ↗</span>
                  </div>

                  {error && <ErrorLine message={error} />}
                  {notice && !error && (
                    <p className="font-annotation text-annotation text-primary-container" role="status">
                      {notice}
                    </p>
                  )}

                  <div className="flex flex-col space-y-space-xs pt-1">
                    <button
                      className="w-full bg-primary-fixed text-on-primary-fixed py-3 rounded-full font-headline-md text-label-lg font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-60"
                      data-testid="reset-submit"
                      disabled={busy || phase === "done"}
                      id="btn-submit"
                      type="submit"
                    >
                      {phase === "done" ? (
                        <>
                          <Icon name="check" className="text-[18px]" />
                          <span>Access Granted. Forwarding...</span>
                        </>
                      ) : busy ? (
                        <>
                          <Icon name="progress_activity" className="animate-spin text-[18px]" />
                          <span>Hashing &amp; Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Update Access Key &amp; Sign In</span>
                          <Icon name="arrow_forward" className="text-[18px]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pb-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-error" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono ml-2">DISPATCH_TELEMETRY.ts</span>
                </div>
                <span className="font-annotation text-annotation text-primary-container font-mono">FLOW_ID: {FLOW_IDS.recovery}</span>
              </div>
              <div className="font-annotation text-annotation text-on-surface-variant space-y-0.5 leading-relaxed overflow-x-auto select-all">
                <p className="text-outline">{"//"} FLOW: AUTH_RESET_DISPATCH</p>
                <p>
                  <span className="text-primary-container">const</span> res = <span className="text-primary-container">await</span> authApi.
                  <span className="text-primary">resetPassword</span>({"{"} token: <span className="text-primary">&apos;{cells.join("") || "······"}&apos;</span>, newPassword: ••• {"}"});
                </p>
                <p>
                  <span className="text-primary-container">if</span> (res.ok) router.<span className="text-primary">push</span>(
                  <span className="text-primary">&apos;{ROUTES.dashboard}&apos;</span>);
                </p>
              </div>
            </div>

            <div className="flex items-center justify-around py-1 font-annotation text-annotation text-outline opacity-80">
              <div className="flex items-center space-x-1">
                <Icon name="lock" className="text-[14px] text-primary-container" />
                <span>JWT HS256 SIGNED</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="memory" className="text-[14px] text-primary-container" />
                <span>ONE-TIME TOKEN</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="verified_user" className="text-[14px] text-primary-container" />
                <span>HASHED AT REST</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ErrorLine({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-2 p-2 rounded-lg bg-surface-container text-tertiary font-body-sm text-body-sm"
      data-testid="auth-error"
      role="alert"
    >
      <Icon name="info" className="text-[16px] text-tertiary" />
      <span>{message}</span>
    </div>
  );
}

export function RecoveryScreen() {
  return (
    <Suspense fallback={<div className="sb-root bg-surface min-h-screen" />}>
      <RecoveryInner />
    </Suspense>
  );
}
