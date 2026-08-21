"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Login failed.");
        return;
      }
      router.push(searchParams.get("from") || "/admin/settings");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--color-bg)" }}>
      <form onSubmit={handleSubmit} className="dialog w-full max-w-sm">
        <h1 className="dialog-title m-0">Admin Login</h1>
        <p className="dialog-body m-0">Enter the admin password to manage your site content.</p>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </div>
        {message && (
          <p className="text-sm font-medium" style={{ color: "#b3261e" }} role="alert">
            {message}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "submitting"}>
          {status === "submitting" ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
