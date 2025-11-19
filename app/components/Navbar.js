"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto mb-6 sticky top-4 z-50">
      <div className="bg-base-200 rounded-lg shadow-lg p-3 flex gap-2 flex-wrap items-center">
        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs opacity-70 font-bold">APT</span>
          <Link href="/dashboard" className="btn btn-ghost btn-sm">
            Dashboard
          </Link>
          <Link href="/courses" className="btn btn-ghost btn-sm">
            Courses
          </Link>
          <Link href="/analysis" className="btn btn-ghost btn-sm">
            Analysis
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm">{user.firstName || user.email}</div>
              <button
                onClick={() => logout()}
                className="btn btn-sm btn-outline btn-error"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/" className="btn btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
