"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  
  // UI States for better UX
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    department: "",
    level: "",
    school: "",
    targetCgpa: "", // Initialized to prevent uncontrolled warning
  });

  // Sync user data when available
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        ...user,
        // Ensure fields aren't null/undefined to avoid input locking
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        school: user.school || "",
        department: user.department || "",
        level: user.level || "",
        targetCgpa: user.targetCgpa || "",
      }));
    }
  }, [user]);

  // Generic change handler to reduce code repetition
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function save(e) {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await updateProfile(form);
      setStatus({ type: "success", message: "Profile saved successfully!" });
      
      // Optional: Clear success message after 3 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to save profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl">Set Up Your Profile</h2>
          <p className="opacity-70 text-sm">
            Keep your academic details up to date to get the most out of the platform.
          </p>

          {/* Feedback Messages */}
          {status.message && (
            <div className={`alert ${status.type === "error" ? "alert-error" : "alert-success"} text-sm py-2 mt-2`}>
              <span>{status.message}</span>
            </div>
          )}

          <form className="space-y-4 mt-4" onSubmit={save}>
            {/* Name Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Academic Info */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">School / University</span>
              </label>
              <input
                name="school"
                value={form.school}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="e.g. University of Lagos"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="e.g. Computer Science"
              />
            </div>

            {/* Level & Goals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Level</span>
                </label>
                <input
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g. 300"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Target CGPA <span className="text-xs opacity-50">(Optional)</span></span>
                </label>
                <input
                  name="targetCgpa"
                  type="number"
                  step="0.01"
                  value={form.targetCgpa}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="5.00"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button 
                className="btn btn-primary w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
