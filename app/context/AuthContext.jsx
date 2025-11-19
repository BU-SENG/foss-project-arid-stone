"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const USER_KEY = "apt_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  function register(payload) {
    // very simple registration: store object in localStorage (no password hashing)
    localStorage.setItem(USER_KEY, JSON.stringify(payload));
    setUser(payload);
    router.push("/dashboard");
  }

  function login({ email, password }) {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return { ok: false, message: "No user found. Please register." };
    const stored = JSON.parse(raw);
    if (stored.email === email && stored.password === password) {
      setUser(stored);
      router.push("/dashboard");
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  }

  function logout() {
    setUser(null);
    // note: keep user in storage so they can login again; if you want to remove, uncomment
    // localStorage.removeItem(USER_KEY);
    router.push("/");
  }

  function updateProfile(payload) {
    const merged = { ...user, ...payload };
    localStorage.setItem(USER_KEY, JSON.stringify(merged));
    setUser(merged);
  }

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
