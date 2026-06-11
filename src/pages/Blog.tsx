/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogHero from "../blog/BlogHero";
import BlogListing from "../blog/BlogListing";
import BlogDetails from "../blog/BlogDetails";

export default function Blog() {
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const location = useLocation();

  // Scroll to top on transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedBlogSlug]);

  // Read clean query params if copy-link was shared
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const readParam = params.get("read");
    if (readParam) {
      setSelectedBlogSlug(readParam);
    }
  }, [location]);

  const handleSelectBlog = (slug: string) => {
    setSelectedBlogSlug(slug);
    // Silent state update in URL for SEO sharing/bookmarks
    const newUrl = `${window.location.pathname}?read=${slug}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleBackToList = () => {
    setSelectedBlogSlug(null);
    const cleanUrl = window.location.pathname;
    window.history.pushState({ path: cleanUrl }, "", cleanUrl);
  };

  if (selectedBlogSlug) {
    return <BlogDetails slug={selectedBlogSlug} onBack={handleBackToList} />;
  }

  return (
    <div id="blog-page-container" className="bg-white min-h-screen">
      <BlogHero />
      <BlogListing onSelectBlog={handleSelectBlog} />
    </div>
  );
}
