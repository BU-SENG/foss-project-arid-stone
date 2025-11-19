"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    department: "",
    level: "",
    school: "",
  });

  useEffect(() => {
    if (user) setForm({ ...form, ...user });
  }, [user]);

  function save(e) {
    e.preventDefault();
    updateProfile(form);
    alert("Profile saved");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Set Up Your Profile</h2>
          <p className="opacity-70">Tell us about your academic program</p>

          <form className="space-y-3 mt-3" onSubmit={save}>
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
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              className="input input-bordered w-full"
              placeholder="School"
            />
            <input
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Department"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="input input-bordered"
                placeholder="Level"
              />
              <input
                value={form.targetCgpa}
                onChange={(e) =>
                  setForm({ ...form, targetCgpa: e.target.value })
                }
                className="input input-bordered"
                placeholder="Target CGPA (optional)"
              />
            </div>

            <button className="btn btn-primary w-full">Save & Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
