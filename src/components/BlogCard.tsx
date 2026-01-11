import * as React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import type { BlogPost } from "../lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="h-full cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 bg-black/50 border-white/10">
          {post.thumbnail && (
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl text-white line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="text-gray-400 line-clamp-2">
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-white/20 text-gray-300"
                >
                  {category}
                </Badge>
              ))}
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 text-gray-300 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
