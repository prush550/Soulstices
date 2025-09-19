import { getPublishedPosts, getPostBySlug } from "@/lib/database-blog";
import type { BlogPost } from "@/lib/types";

export default async function ErrorDebugPage() {
  let postsError: string | null = null;
  let posts: BlogPost[] = [];
  let postBySlugError: string | null = null;
  let testPost: BlogPost | null = null;

  // Test getPublishedPosts function
  try {
    posts = await getPublishedPosts();
  } catch (error) {
    postsError = error instanceof Error ? error.message : 'Unknown error';
  }

  // Test getPostBySlug function
  try {
    testPost = await getPostBySlug('test-2');
  } catch (error) {
    postBySlugError = error instanceof Error ? error.message : 'Unknown error';
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f0f0f0' }}>
      <h1>Error Debug Information</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>getPublishedPosts() Test:</h2>
        {postsError ? (
          <div style={{ backgroundColor: '#ffebee', padding: '10px', color: 'red' }}>
            <strong>ERROR:</strong> {postsError}
          </div>
        ) : (
          <div style={{ backgroundColor: '#e8f5e8', padding: '10px' }}>
            <strong>SUCCESS:</strong> Found {posts.length} posts
            <pre style={{ marginTop: '10px', fontSize: '12px' }}>
              {JSON.stringify(posts.map(p => ({ title: p.title, slug: p.slug, status: p.status })), null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>getPostBySlug('test-2') Test:</h2>
        {postBySlugError ? (
          <div style={{ backgroundColor: '#ffebee', padding: '10px', color: 'red' }}>
            <strong>ERROR:</strong> {postBySlugError}
          </div>
        ) : testPost ? (
          <div style={{ backgroundColor: '#e8f5e8', padding: '10px' }}>
            <strong>SUCCESS:</strong> Found post: {testPost.title}
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff3cd', padding: '10px', color: '#856404' }}>
            <strong>WARNING:</strong> No post found with slug 'test-2'
          </div>
        )}
      </div>

      <div>
        <h2>Environment Check:</h2>
        <p>NODE_ENV: {process.env.NODE_ENV || 'undefined'}</p>
        <p>Database URL defined: {process.env.DATABASE_URL ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
