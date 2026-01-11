import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { getBlogPost, getBlogPosts } from "../lib/cms";
import type { BlogPost as BlogPostType } from "../lib/types";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPostType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      setLoading(true);
      try {
        const postData = await getBlogPost(slug);
        if (!postData) {
          navigate("/blog", { replace: true });
          return;
        }
        setPost(postData);

        // Fetch related posts (same category or tags)
        const related = await getBlogPosts(1, 3, {
          category: postData.categories[0],
        });
        setRelatedPosts(
          related.items.filter((p) => p.id !== postData.id).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/blog", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Skeleton className="h-12 w-32 mb-8" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </motion.div>

        {/* Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Categories and Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {post.categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="border-white/20 text-gray-300"
              >
                {category}
              </Badge>
            ))}
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/10 text-gray-300 border-0"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content */}
          <div className="mb-12">
            {typeof post.content === 'string' ? (
              // Render as Markdown if content is string
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-white first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-3 text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-2 text-white">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-white">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 mb-4 leading-relaxed text-base md:text-lg">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-white underline hover:text-gray-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-white/10 text-gray-200 px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="block bg-white/10 text-gray-200 px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
                      {children}
                    </pre>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2 text-base md:text-lg ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2 text-base md:text-lg ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-6 text-base md:text-lg">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-lg my-6 max-w-full h-auto mx-auto"
                    />
                  ),
                  hr: () => (
                    <hr className="border-white/10 my-8" />
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            ) : (
              // Render as Rich text Document
              documentToReactComponents(post.content as Document, {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (node, children) => (
                    <p className="text-gray-300 mb-4 leading-relaxed text-base md:text-lg">
                      {children}
                    </p>
                  ),
                  [BLOCKS.HEADING_1]: (node, children) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-white first:mt-0">
                      {children}
                    </h1>
                  ),
                  [BLOCKS.HEADING_2]: (node, children) => (
                    <h2 className="text-2xl font-bold mt-8 mb-3 text-white">
                      {children}
                    </h2>
                  ),
                  [BLOCKS.HEADING_3]: (node, children) => (
                    <h3 className="text-xl font-semibold mt-6 mb-2 text-white">
                      {children}
                    </h3>
                  ),
                  [BLOCKS.HEADING_4]: (node, children) => (
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-white">
                      {children}
                    </h4>
                  ),
                  [BLOCKS.UL_LIST]: (node, children) => (
                    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2 text-base md:text-lg ml-4">
                      {children}
                    </ul>
                  ),
                  [BLOCKS.OL_LIST]: (node, children) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2 text-base md:text-lg ml-4">
                      {children}
                    </ol>
                  ),
                  [BLOCKS.LIST_ITEM]: (node, children) => (
                    <li className="mb-1">{children}</li>
                  ),
                  [BLOCKS.QUOTE]: (node, children) => (
                    <blockquote className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-6 text-base md:text-lg">
                      {children}
                    </blockquote>
                  ),
                  [BLOCKS.HR]: () => (
                    <hr className="border-white/10 my-8" />
                  ),
                  [BLOCKS.EMBEDDED_ASSET]: (node) => {
                    const { file, title } = node.data.target.fields;
                    const imageUrl = file?.url;
                    if (imageUrl) {
                      return (
                        <img
                          src={`https:${imageUrl}`}
                          alt={title || ''}
                          className="rounded-lg my-6 max-w-full h-auto mx-auto"
                        />
                      );
                    }
                    return null;
                  },
                  [INLINES.HYPERLINK]: (node, children) => (
                    <a
                      href={node.data.uri}
                      className="text-white underline hover:text-gray-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
                renderMark: {
                  [MARKS.BOLD]: (text) => (
                    <strong className="font-bold text-white">{text}</strong>
                  ),
                  [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
                  [MARKS.CODE]: (text) => (
                    <code className="bg-white/10 text-gray-200 px-2 py-1 rounded text-sm font-mono">
                      {text}
                    </code>
                  ),
                },
              })
            )}
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-300">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
