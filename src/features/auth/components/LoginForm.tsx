"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/features/auth/api/auth";
import { useLoadingStore } from "@/app/dashboard/components/LoadingScreen/Loadstore";
import { FLOW_IDS, ROUTES } from "@/lib/routes";
import { AuthCard, AuthError, AuthField, AuthShell, AuthSubmit } from "./AuthKit";

export function LoginForm() {
  const router = useRouter();
  const { toggleLoading } = useLoadingStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.prefetch(ROUTES.dashboard);
    if (new URLSearchParams(window.location.search).get("expired") === "1") {
      setError("Your session expired. Please sign in again.");
    }
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Invalid session credentials");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      toggleLoading();
      const next = new URLSearchParams(window.location.search).get("next");
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : ROUTES.dashboard;
      router.push(safeNext);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      flowId={FLOW_IDS.login}
      route={ROUTES.login}
      parentRoute={ROUTES.landing}
      stateDependency={["useAuthStore"]}
    >
      <AuthCard title="Chat-box" subtitle="Welcome back to your drafting workspace.">
        <form className="flex flex-col gap-space-sm w-full" onSubmit={onSubmit} noValidate>
          <AuthField
            id="email"
            label="Work Email"
            tag="ID: 01"
            type="email"
            autoComplete="email"
            placeholder="operator@sketchbot.io"
            data-testid="auth-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthField
            id="password"
            label="Password"
            tag="ID: 02"
            revealable
            autoComplete="current-password"
            placeholder="••••••••••••"
            data-testid="auth-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            trailing={
              <Link className="text-black hover:underline" href={ROUTES.recovery}>
                Forgot password?
              </Link>
            }
          />
          <AuthError message={error} />
          <AuthSubmit loading={loading}>Sign In to Workspace</AuthSubmit>
        </form>
        <div className="flex items-center justify-center pt-4 text-center">
          <p className="font-sans text-[12px] text-gray-600 font-bold uppercase tracking-wide">
            Don&apos;t have an account?
            <Link className="text-black hover:bg-black hover:text-white transition-colors ml-2 px-2 py-1 border-2 border-transparent hover:border-black" href={ROUTES.signUp}>
              Create account
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
