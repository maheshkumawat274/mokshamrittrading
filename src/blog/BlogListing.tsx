/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Search, ChevronRight, Eye, Calendar, User, ArrowRight } from "lucide-react";
import { BlogItem, BlogCategory } from "../types";

interface BlogListingProps {
  onSelectBlog: (slug: string) => void;
}

export default function BlogListing({ onSelectBlog }: BlogListingProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/blog_categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = "/api/blogs?includeUnpublished=false";
      if (selectedCategory !== "all") {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="blog-listing-module" className="bg-white font-sans text-slate-700">
      
      {/* Search & Filter Horizontal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200 bg-slate-50 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Search Input Box */}
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search intel reports..."
            className="w-full bg-white border border-slate-200 rounded pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="blog-search-box"
          />
        </div>

        {/* Category Filters row */}
        <div className="md:col-span-8 flex flex-wrap gap-2 justify-start md:justify-end" id="filters-container">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition shadow-sm ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            All Reports
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition shadow-sm ${
                selectedCategory === cat.slug
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Main Listing Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="listings-wrapper">
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-500 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Fetching trade insights data...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-24 text-center text-slate-500 text-xs font-mono">
            No active reports match the selected criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article 
                key={blog.id}
                className="group bg-slate-50 border border-slate-200 hover:border-slate-400 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-350 hover:-translate-y-1"
                id={`blog-card-${blog.slug}`}
              >
                {/* Header Image backdrop */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                    {blog.categoryName}
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-450" />
                        <span>{new Date(blog.createdDate).toLocaleDateString()}</span>
                      </span>
                      <span>&bull;</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectBlog(blog.slug)}
                      className="text-slate-900 text-sm font-extrabold tracking-tight uppercase leading-snug hover:text-slate-800 cursor-pointer pt-1 transition-colors"
                    >
                      {blog.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed font-light font-sans line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="flex items-center space-x-1 text-slate-500 font-sans text-[11px]">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>{blog.author.split(",")[0]}</span>
                    </span>

                    <button
                      onClick={() => onSelectBlog(blog.slug)}
                      className="text-slate-805 hover:text-slate-950 hover:underline inline-flex items-center space-x-1 cursor-pointer font-bold uppercase text-[10px]"
                      id={`read-blog-btn-${blog.slug}`}
                    >
                      <span>Read Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
