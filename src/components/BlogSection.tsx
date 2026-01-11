import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BlogCard } from "./BlogCard";
import { BlogSearch } from "./BlogSearch";
import { BlogFilters } from "./BlogFilters";
import { BlogPagination } from "./BlogPagination";
import { Skeleton } from "./ui/skeleton";
import { getBlogPosts, getCategories, getTags, searchBlogPosts } from "../lib/cms";
import type { BlogPost, BlogCategory, BlogTag } from "../lib/types";

export function BlogSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [categories, setCategories] = React.useState<BlogCategory[]>([]);
  const [tags, setTags] = React.useState<BlogTag[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    total: 0,
    page: 1,
    pageSize: 9,
    totalPages: 0,
  });

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || undefined;
  const tagFilter = searchParams.get("tag") || undefined;

  // Fetch categories and tags on mount
  React.useEffect(() => {
    async function fetchFilters() {
      try {
        const [cats, tagList] = await Promise.all([
          getCategories(),
          getTags(),
        ]);
        setCategories(cats);
        setTags(tagList);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    }
    fetchFilters();
  }, []);

  // Fetch posts when filters or page change
  React.useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let result;
        if (searchQuery) {
          result = await searchBlogPosts(searchQuery, currentPage, pagination.pageSize);
        } else {
          result = await getBlogPosts(currentPage, pagination.pageSize, {
            category: categoryFilter,
            tag: tagFilter,
          });
        }
        setPosts(result.items);
        setPagination({
          total: result.total,
          page: result.page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage, searchQuery, categoryFilter, tagFilter, pagination.pageSize]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
      params.delete("page");
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (category?: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page");
    setSearchParams(params);
  };

  const handleTagChange = (tag?: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    params.delete("page");
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Thoughts, tutorials, and insights on web development
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <BlogSearch value={searchQuery} onChange={handleSearch} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogFilters
                categories={categories}
                tags={tags}
                selectedCategory={categoryFilter}
                selectedTag={tagFilter}
                onCategoryChange={handleCategoryChange}
                onTagChange={handleTagChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">
                  {searchQuery || categoryFilter || tagFilter
                    ? "No posts found matching your filters."
                    : "No blog posts yet. Check back soon!"}
                </p>
                {(searchQuery || categoryFilter || tagFilter) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-white underline hover:text-gray-300"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <BlogPagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
