"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@naijahouse.co.uk");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Login failed");
    localStorage.setItem("naija_admin_token", data.token);
    setMsg("Logged in. You can now open /admin/products/new to add a product.");
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-brandGreen mb-4">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          type="email" placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          type="password" placeholder="Password"
        />
        <button className="bg-brandGreen text-white px-4 py-2 rounded">Sign In</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </main>
  );
}
