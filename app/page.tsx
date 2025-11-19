"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) setErr(res.message);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Academic Progress Tracker</h2>
          <p className="opacity-70">Track your CGPA and academic journey</p>

          {err && <div className="alert alert-error mt-2">{err}</div>}

          <form onSubmit={submit} className="space-y-3 mt-4">
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input input-bordered w-full"
              type="password"
              placeholder="Password"
            />

            <button className="btn btn-primary w-full">Login</button>

            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link href="/register" className="link">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
