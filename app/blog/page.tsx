import { getAllPosts } from "@/lib/mdx"; // Ensure this function is defined correctly
import { useState } from "react";
import Link from "next/link";

type Props = {
  posts: BlogPost[]; // Define BlogPost type if not already defined
};

export default function BlogPage({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Soulstices Blog
      </h1>

      {/* Search & Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-2xl shadow-sm focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-2xl shadow-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog List */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {post.date} · {post.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Fetch posts at build time
export async function getStaticProps() {
  const posts = getAllPosts(); // Ensure this function is synchronous or handle it accordingly

  return {
    props: {
      posts,
    },
  };
}
