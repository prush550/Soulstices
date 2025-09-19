import { getPublishedPosts } from "@/lib/database-blog";

export default async function BlogTestPage() {
  const posts = await getPublishedPosts();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blog Test Page - Simple HTML Rendering</h1>
      <p>Posts found: {posts.length}</p>
      
      {posts.length === 0 ? (
        <p style={{ color: 'red' }}>No posts found!</p>
      ) : (
        <div>
          {posts.map((post, index) => (
            <div key={post.slug} style={{ 
              border: '1px solid #ccc', 
              padding: '15px', 
              margin: '10px 0',
              backgroundColor: '#f9f9f9' 
            }}>
              <h2>#{index + 1}: {post.title}</h2>
              <p><strong>Slug:</strong> {post.slug}</p>
              <p><strong>Status:</strong> {post.status}</p>
              <p><strong>Category:</strong> {post.category}</p>
              <p><strong>Excerpt:</strong> {post.excerpt}</p>
              <p><strong>Publish Date:</strong> {post.publishDate}</p>
              <p><strong>Author:</strong> {post.author}</p>
              <hr />
              <p><strong>Content Preview:</strong></p>
              <p style={{ fontStyle: 'italic' }}>
                {post.content.substring(0, 200)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
