/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowLeft, User, Calendar, Clock, Sparkles, Share2, CornerDownRight } from "lucide-react";
import { BlogItem } from "../types";

interface BlogDetailsProps {
  slug: string;
  onBack: () => void;
}

export default function BlogDetails({ slug, onBack }: BlogDetailsProps) {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [related, setRelated] = useState<BlogItem[]>([]);

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
        
        // Fetch matching category related entries
        const relRes = await fetch(`/api/blogs?category=${data.categoryId}`);
        if (relRes.ok) {
          const relData = await relRes.json();
          // Exclude self
          setRelated(relData.filter((b: BlogItem) => b.id !== data.id).slice(0, 3));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyLinkToClip = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Report linkage duplicated to host cache!");
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-mono text-slate-500 flex flex-col items-center justify-center space-y-4 max-w-7xl mx-auto px-4">
        <div className="w-8 h-8 border-2 border-slate-905 border-t-transparent rounded-full animate-spin"></div>
        <span>Translating deep archive records...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-24 text-center font-mono text-slate-500 text-xs max-w-7xl mx-auto px-4">
        Archive record not localized.
        <button onClick={onBack} className="block mx-auto mt-4 text-slate-950 hover:underline cursor-pointer">
          Return to directory
        </button>
      </div>
    );
  }

  // Very simple Markdown parser for headings and bullet points to render contents beautifully
  const renderParagraphs = (rawContent: string) => {
    return rawContent.split("\n\n").map((para, idx) => {
      const trimmed = para.trim();
      if (trimmed.startsWith("##")) {
        return (
          <h2 key={idx} className="text-xl font-bold text-slate-900 uppercase tracking-tight mt-8 mb-4 border-b border-slate-200 pb-2">
            {trimmed.replace("##", "").trim()}
          </h2>
        );
      }
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-sm font-bold text-slate-800 uppercase tracking-widest mt-6 mb-3">
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("- ")) {
        const bullets = trimmed.split("\n").map((b, i) => (
          <li key={i} className="flex items-start space-x-2 text-slate-600">
            <CornerDownRight className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
            <span>{b.replace("- ", "").trim()}</span>
          </li>
        ));
        return (
          <ul key={idx} className="space-y-3.5 my-5 pl-1">
            {bullets}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-slate-600 text-xs leading-relaxed font-light font-sans mb-5 whitespace-pre-wrap">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article id="blog-details-view" className="bg-white font-sans text-slate-700 min-h-screen pb-20">
      
      {/* Top Breadcrumb row */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-705 hover:text-slate-950 transition cursor-pointer"
          id="details-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Report Details</span>
        </button>
      </div>

      {/* Title block */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="inline-block px-3 py-1 bg-white border border-slate-200 text-slate-700 font-mono text-[9px] uppercase tracking-widest rounded shadow-sm">
          {blog.categoryName}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase leading-snug">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono border-y border-slate-200 py-4">
          <span className="flex items-center space-x-1">
            <User className="w-4 h-4 text-slate-650" />
            <span className="text-slate-600">{blog.author}</span>
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-slate-650" />
            <span>{new Date(blog.createdDate).toLocaleDateString()}</span>
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-slate-650" />
            <span>{blog.readTime}</span>
          </span>
        </div>
      </header>

      {/* Main Wide Photo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl border border-slate-200 shadow-lg">
          <img
            src={blog.image}
            alt={blog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            id="details-hero-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/10 to-transparent"></div>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
        
        {/* Left main content panels */}
        <div className="lg:col-span-8 space-y-2">
          <div className="prose text-slate-700">
            {renderParagraphs(blog.content)}
          </div>
        </div>

        {/* Right Sidebar actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest border-b border-slate-100 pb-2">
              Resource Distribution Desk
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-light font-sans">
              This intelligence brief was compiled by Mokshamrit Trading's core research divisions. Duplications are strictly governed by ICC trade guidelines.
            </p>
            <button
              onClick={copyLinkToClip}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 font-bold tracking-wider uppercase text-[10px] rounded border border-slate-200 transition flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Duplicate Link</span>
            </button>
          </div>

          {/* Related Articles list */}
          {related.length > 0 && (
            <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-lg p-5 shadow-sm">
              <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest border-b border-slate-100 pb-2">
                Related Analyses
              </h4>
              <div className="space-y-3">
                {related.map(rel => (
                  <div 
                    key={rel.id}
                    onClick={() => {
                      fetch(`/api/blogs/${rel.slug}`).then(r => r.ok && fetchBlogDetails());
                    }}
                    className="block hover:bg-slate-100 p-2.5 rounded bg-white border border-slate-200 hover:border-slate-400 cursor-pointer shadow-sm transition-all"
                  >
                    <span className="text-slate-900 font-extrabold block uppercase text-[10px] tracking-tight truncate mb-1">{rel.title}</span>
                    <span className="text-[9px] font-mono text-slate-500 block">By: {rel.author.split(",")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sourcing warning */}
          <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 font-mono text-[10px] text-slate-800 uppercase font-bold">
              <Sparkles className="w-4 h-4 text-slate-500" />
              <span>FOB Sourcing Standard</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-light">
              Mokshamrit Trading complies with standard customs clearance procedures across EU-Zone & Asian land terminals.
            </p>
          </div>
        </div>

      </div>

    </article>
  );
}
