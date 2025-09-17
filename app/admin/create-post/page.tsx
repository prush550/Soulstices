"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: "",
    status: "draft",
    publishDate: "",
    featuredImage: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Check if user is authorized (FOUNDER role)
  if (status === "loading") {
    return <div className="p-8 text-white bg-slate-900 min-h-screen">Loading...</div>;
  }

  if (!session || (session.user as any)?.role !== "FOUNDER") {
    return (
      <div className="p-8 text-white bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You need to be logged in as a Founder to create posts.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const postData = {
        ...form,
        date: new Date().toISOString(),
        publishDate: form.status === "scheduled" ? form.publishDate : new Date().toISOString()
      };

      const res = await fetch("/api/admin/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Post created successfully!");
        // Reset form
        setForm({
          title: "",
          excerpt: "",
          category: "",
          content: "",
          status: "draft",
          publishDate: "",
          featuredImage: ""
        });
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to create post"}`);
      }
    } catch (error) {
      setMessage("❌ Failed to create post");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-semibold">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Category *</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                placeholder="e.g., Technology, Lifestyle, etc."
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Excerpt *</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-700 h-24"
              placeholder="Brief description of the post..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-700 h-64"
              placeholder="Write your post content here..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Publish Date {form.status === "scheduled" && "*"}
              </label>
              <input
                type="datetime-local"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                required={form.status === "scheduled"}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Featured Image URL</label>
              <input
                type="url"
                name="featuredImage"
                value={form.featuredImage}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-700"
                placeholder="https://..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700 text-white py-3 rounded font-semibold text-lg"
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
