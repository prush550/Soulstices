import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote"; // Adjust import based on your setup
import { notFound } from "next/navigation"; // Import notFound for handling 404

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug); // Ensure this is awaited

  // Handle case where post is not found
  if (!post) {
    notFound(); // Redirect to 404 page
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {post.meta.date} · {post.meta.category}
      </p>
      <MDXRemote source={post.content} />
    </article>
  );
}
