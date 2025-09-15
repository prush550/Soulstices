"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    hobbiesAndInterests: "",
    bio: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session) return <p className="p-8">You must be logged in to view your profile.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage(data.error || "Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {message && <p className="mb-4">{message}</p>}

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <label className="block mb-2">Email (read-only)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          disabled
          className="w-full p-3 mb-4 rounded bg-slate-700 opacity-50"
        />

        <label className="block mb-2">Password (change)</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
          placeholder="New password"
        />

        <label className="block mb-2">Hobbies & Interests</label>
        <input
          type="text"
          name="hobbiesAndInterests"
          value={form.hobbiesAndInterests}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <label className="block mb-2">Brief Bio</label>
        <textarea
          name="bio"
          maxLength={256}
          value={form.bio}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
