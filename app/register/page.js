"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("Email & password required");
    register(form);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Create Account</h2>

          <form onSubmit={submit} className="space-y-3 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="input input-bordered"
                placeholder="First name"
              />
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="input input-bordered"
                placeholder="Last name"
              />
            </div>
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

            <button className="btn btn-primary w-full">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
