"use client";
import { useState } from "react";

export default function SetupPage() {
  const [form, setForm] = useState({
    email: "mail.soulstices@gmail.com",
    password: "Jmjnap@550",
    name: "Founder",
    setupKey: "create-founder-2024"
  });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const createFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/setup/founder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        fetchUsers(); // Refresh the user list
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to create founder account");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/setup/founder", {
        method: "GET",
      });

      const data = await res.json();
      
      if (res.ok) {
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Setup</h1>
        
        {/* Create Founder Form */}
        <div className="bg-slate-800 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4">Create Founder Account</h2>
          
          {message && (
            <p className={`mb-4 p-3 rounded ${message.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
              {message}
            </p>
          )}

          <form onSubmit={createFounder} className="space-y-4">
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Setup Key</label>
              <input
                type="text"
                name="setupKey"
                value={form.setupKey}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700 text-white px-6 py-3 rounded font-semibold"
            >
              {loading ? "Creating..." : "Create Founder"}
            </button>
          </form>
        </div>

        {/* Current Users */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Current Users in Database</h2>
            <button
              onClick={fetchUsers}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>

          {users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user: any) => (
                <div key={user.id} className="bg-slate-700 p-3 rounded">
                  <div className="flex justify-between">
                    <span><strong>Email:</strong> {user.email}</span>
                    <span><strong>Role:</strong> {user.role}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Name:</strong> {user.name} | <strong>ID:</strong> {user.id}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No users found. Click "Refresh" to load users.</p>
          )}
        </div>
      </div>
    </div>
  );
}
