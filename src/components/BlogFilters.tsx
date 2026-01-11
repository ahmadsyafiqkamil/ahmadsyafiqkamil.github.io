import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import type { BlogCategory, BlogTag } from "../lib/types";

interface BlogFiltersProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  selectedCategory?: string;
  selectedTag?: string;
  onCategoryChange: (category?: string) => void;
  onTagChange: (tag?: string) => void;
  onClearFilters: () => void;
}

export function BlogFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
  onClearFilters,
}: BlogFiltersProps) {
  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.slug
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-gray-300 hover:border-white/40"
                }`}
                onClick={() =>
                  onCategoryChange(selectedCategory === category.slug ? undefined : category.slug)
                }
              >
                {category.name}
                {category.postCount !== undefined && ` (${category.postCount})`}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTag === tag.slug ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  selectedTag === tag.slug
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                onClick={() =>
                  onTagChange(selectedTag === tag.slug ? undefined : tag.slug)
                }
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
