import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = getPostBySlug(slug);

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
