"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/features/auth/api/auth";
import { ROUTES } from "@/lib/routes";
import { AuthCard, AuthError, AuthField, AuthShell, AuthSubmit } from "./AuthKit";

export function SignUpForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password !== repeat) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(email, password, displayName, displayName);
      router.push(ROUTES.dashboard);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell flowId="FLOW_AUTH_SIGNUP" route={ROUTES.signUp} parentRoute={ROUTES.login} stateDependency={["useAuthStore"]}>
      <AuthCard title="Create account" subtitle="Provision your drafting workspace.">
        <form className="flex flex-col gap-space-sm w-full" onSubmit={onSubmit} noValidate>
          <AuthField
            id="displayName"
            label="Display Name"
            tag="ID: 01"
            autoComplete="nickname"
            placeholder="Omo Designer"
            data-testid="auth-display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <AuthField
            id="email"
            label="Work Email"
            tag="ID: 02"
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
            tag="ID: 03"
            revealable
            autoComplete="new-password"
            placeholder="••••••••••••"
            data-testid="auth-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthField
            id="repeatPassword"
            label="Repeat Password"
            tag="ID: 04"
            revealable
            autoComplete="new-password"
            placeholder="••••••••••••"
            data-testid="auth-password-repeat"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          />
          <AuthError message={error} />
          <AuthSubmit loading={loading}>Create Workspace</AuthSubmit>
        </form>
        <div className="flex items-center justify-center pt-4 text-center">
          <p className="font-sans text-[12px] text-gray-600 font-bold uppercase tracking-wide">
            Already have an account?
            <Link className="text-black hover:bg-black hover:text-white transition-colors ml-2 px-2 py-1 border-2 border-transparent hover:border-black" href={ROUTES.login}>
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
