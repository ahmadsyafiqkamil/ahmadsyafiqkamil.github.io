import * as React from "react";
import { getBlogPosts, getCategories, getTags, clearCache, debugContentful } from "../lib/cms";

export function ContentfulTest() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [debugData, setDebugData] = React.useState<any>(null);
  const [showDebug, setShowDebug] = React.useState(false);

  const checkContentful = async () => {
    setLoading(true);
    setError(null);
    try {
      const [posts, categories, tags] = await Promise.all([
        getBlogPosts(1, 10),
        getCategories(),
        getTags(),
      ]);

      setData({
        posts,
        categories,
        tags,
        env: {
          spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'Not set',
          hasToken: !!import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
          tokenPreview: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN 
            ? import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN.substring(0, 20) + '...' 
            : 'Not set',
          tokenType: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN?.startsWith('CFPAT-') 
            ? '⚠️ Management API Token (Wrong!)' 
            : import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN 
              ? '✅ Delivery API Token' 
              : 'Not set',
        },
      });
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      console.error('Contentful test error:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkContentful();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contentful Data Check</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={checkContentful}
            disabled={loading}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>
          <button
            onClick={() => {
              clearCache();
              checkContentful();
            }}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Clear Cache & Refresh
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const debug = await debugContentful();
                setDebugData(debug);
                setShowDebug(true);
              } catch (err: any) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            Debug Contentful
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h2 className="text-red-400 font-bold mb-2">Error:</h2>
            <pre className="text-sm text-red-300">{error}</pre>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Environment Info */}
            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Environment Variables</h2>
              <pre className="text-sm text-gray-300">
                {JSON.stringify(data.env, null, 2)}
              </pre>
            </div>

            {/* Posts */}
            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold mb-2">
                Blog Posts ({data.posts.total})
              </h2>
              {data.posts.items.length === 0 ? (
                <p className="text-gray-400">No blog posts found</p>
              ) : (
                <div className="space-y-4">
                  {data.posts.items.map((post: any) => (
                    <div key={post.id} className="p-3 bg-black rounded border border-gray-700">
                      <h3 className="font-semibold text-white">{post.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Slug: {post.slug} | Published: {post.publishedAt}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {post.categories.map((cat: string) => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded"
                          >
                            {cat}
                          </span>
                        ))}
                        {post.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold mb-2">
                Categories ({data.categories.length})
              </h2>
              {data.categories.length === 0 ? (
                <p className="text-gray-400">No categories found</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.categories.map((cat: any) => (
                    <span
                      key={cat.id}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded"
                    >
                      {cat.name} ({cat.slug})
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="p-4 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold mb-2">
                Tags ({data.tags.length})
              </h2>
              {data.tags.length === 0 ? (
                <p className="text-gray-400">No tags found</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Raw Data */}
            <details className="p-4 bg-gray-900 rounded-lg">
              <summary className="cursor-pointer font-bold mb-2">
                Raw JSON Data
              </summary>
              <pre className="text-xs text-gray-400 overflow-auto max-h-96 mt-2">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Debug Section */}
        {showDebug && debugData && (
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-purple-900/50 rounded-lg border border-purple-500">
              <h2 className="text-xl font-bold mb-4 text-purple-300">🔍 Debug Information</h2>
              
              {/* Content Types */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Content Types Found:</h3>
                {debugData.contentTypes && debugData.contentTypes.length > 0 ? (
                  <div className="space-y-2">
                    {debugData.contentTypes.map((ct: any) => (
                      <div key={ct.id} className="p-2 bg-black/50 rounded text-sm">
                        <div className="font-mono text-purple-300">ID: {ct.id}</div>
                        <div className="text-gray-300">Name: {ct.name}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Fields: {ct.fields.map((f: any) => f.id).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-400">No content types found!</p>
                )}
              </div>

              {/* All Entries */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">All Entries ({debugData.allEntries?.total || 0}):</h3>
                {debugData.allEntries?.items && debugData.allEntries.items.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {debugData.allEntries.items.map((entry: any) => (
                      <div key={entry.id} className="p-2 bg-black/50 rounded text-sm">
                        <div className="font-mono text-purple-300">ID: {entry.id}</div>
                        <div className="text-gray-300">Content Type: {entry.contentType}</div>
                        <div className="text-gray-300">Title: {entry.title}</div>
                        <div className={`text-xs ${entry.publishedAt === 'Not published' ? 'text-red-400' : 'text-green-400'}`}>
                          Status: {entry.publishedAt === 'Not published' ? '❌ NOT PUBLISHED' : '✅ Published'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-400">No entries found!</p>
                )}
              </div>

              {/* Blog Post Entries */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Blog Post Entries:</h3>
                {debugData.blogPostEntries?.error ? (
                  <p className="text-red-400">Error: {debugData.blogPostEntries.error}</p>
                ) : debugData.blogPostEntries?.items && debugData.blogPostEntries.items.length > 0 ? (
                  <div className="space-y-2">
                    {debugData.blogPostEntries.items.map((entry: any) => (
                      <div key={entry.sys.id} className="p-2 bg-black/50 rounded text-sm">
                        <div className="font-mono text-purple-300">ID: {entry.sys.id}</div>
                        <div className="text-gray-300">Title: {entry.fields?.title || 'No title'}</div>
                        <div className="text-gray-300">Slug: {entry.fields?.slug || 'No slug'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-yellow-400">⚠️ No blogPost entries found. Check if content type ID is correct.</p>
                )}
              </div>

              {/* Entry by ID */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Entry by ID (1c5WU37PqOMF9pcIPV3ybU):</h3>
                {debugData.entryById?.error ? (
                  <p className="text-red-400">Error: {debugData.entryById.error}</p>
                ) : debugData.entryById?.sys ? (
                  <div className="p-2 bg-black/50 rounded text-sm">
                    <div className="font-mono text-purple-300">ID: {debugData.entryById.sys.id}</div>
                    <div className="text-gray-300">Content Type: {debugData.entryById.sys.contentType.sys.id}</div>
                    <div className="text-gray-300">Title: {debugData.entryById.fields?.title || 'No title'}</div>
                    <div className={`text-xs ${debugData.entryById.sys.publishedAt ? 'text-green-400' : 'text-red-400'}`}>
                      Status: {debugData.entryById.sys.publishedAt ? '✅ Published' : '❌ NOT PUBLISHED'}
                    </div>
                  </div>
                ) : (
                  <p className="text-red-400">Entry not found!</p>
                )}
              </div>

              {/* Full Debug Data */}
              <details className="mt-4">
                <summary className="cursor-pointer font-bold mb-2 text-purple-300">
                  Full Debug JSON
                </summary>
                <pre className="text-xs text-gray-400 overflow-auto max-h-96 mt-2 bg-black/50 p-4 rounded">
                  {JSON.stringify(debugData, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
