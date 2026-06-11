import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { 
  FileText, Plus, Search, Edit3, Trash2, Eye, Sparkles, AlertCircle, HelpCircle,
  Bold, Italic, Link, List, Quote, Heading2, Heading3, Code, EyeOff, Save, CheckCircle
} from "lucide-react";
import type { BlogCategory, BlogItem } from "../../types";

interface AdminBlogsProps {
  blogs: BlogItem[];
  categories: BlogCategory[];
  fetchAdminData: () => void;
  addActivity: (msg: string) => void;
  getAuthHeader: () => any;
}

export default function AdminBlogs({ blogs, categories, fetchAdminData, addActivity, getAuthHeader }: AdminBlogsProps) {
  const [blogSearch, setBlogSearch] = useState("");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  // Editor modes: "visual" or "html" (TinyMCE tabs)
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");

  // Blog Form/Editor State
  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: "",
    author: "Mahesh Kumar, CEO",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    published: true,
    // NEW: SEO Custom Fields
    seoTitle: "",
    seoKeywords: "",
    seoDescription: ""
  });
  const [blogFormError, setBlogFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter listings
  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      summary: "",
      content: "## Overview of New Trade Corridors\n\nWrite your rich import-export content here...\n\n- Bullet points showing heavy alloy specifications.\n- FOB Port logistics analysis.\n- Escrow letter of credit parameters.",
      categoryId: categories[0]?.id.toString() || "1",
      author: "Mahesh Kumar, CEO",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
      published: true,
      seoTitle: "",
      seoKeywords: "export import company raw materials steel trade fob cargo logistics gurugram ncr",
      seoDescription: "An in-depth corporate analysis of standard cargo shipping procedures, dry port warehousing configurations and commercial escrow guidelines."
    });
    setBlogFormError("");
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      categoryId: blog.categoryId.toString(),
      author: blog.author,
      readTime: blog.readTime,
      image: blog.image,
      published: blog.published,
      seoTitle: blog.seoTitle || blog.title,
      seoKeywords: blog.seoKeywords || "fob trade import export logistics raw sourcing ncr",
      seoDescription: blog.seoDescription || blog.summary
    });
    setBlogFormError("");
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: FormEvent) => {
    e.preventDefault();
    setBlogFormError("");
    setIsSaving(true);

    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      setBlogFormError("Please configure Title and Main Content body correctly.");
      setIsSaving(false);
      return;
    }

    try {
      const isEdit = !!editingBlog;
      const url = isEdit ? `/api/blogs/${editingBlog.id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          ...blogForm,
          categoryId: parseInt(blogForm.categoryId),
          // fallback SEO titles
          seoTitle: blogForm.seoTitle || blogForm.title,
          seoDescription: blogForm.seoDescription || blogForm.summary || blogForm.title
        })
      });

      const data = await res.json();
      if (res.ok) {
        addActivity(isEdit ? `Modified blog post: "${blogForm.title}"` : `Created physical blog post: "${blogForm.title}"`);
        setIsBlogModalOpen(false);
        fetchAdminData();
      } else {
        setBlogFormError(data.error || "Authentication expired or fields flawed.");
      }
    } catch (err) {
      setBlogFormError("Connection loss during block insertion.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (!window.confirm(`Permanently erase blog entry "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });
      if (res.ok) {
        addActivity(`Erase blog entry ID: ${id}`);
        fetchAdminData();
      } else {
        alert("Erase command rejected by database rules.");
      }
    } catch (err) {
      alert("System fault deploying delete triggers.");
    }
  };

  const togglePublishState = async (blog: BlogItem) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          published: !blog.published
        })
      });
      if (res.ok) {
        addActivity(`Toggled publication of "${blog.title}" to ${!blog.published}`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Preset images for easy visual updates
  const presetBlogImages = [
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80", // cargo shipping
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", // logistics warehouse
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80", // heavy shipping ports
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", // manufacturing alloy plant
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"  // industrial tech blocks
  ];

  // TinyMCE styled formatting injection helper
  const insertFormat = (tag: string, placeholder = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = blogForm.content;

    const selection = currentText.substring(start, end) || placeholder;
    let replacement = "";

    switch (tag) {
      case "bold":
        replacement = `**${selection}**`;
        break;
      case "italic":
        replacement = `*${selection}*`;
        break;
      case "link":
        replacement = `[${selection}](https://mokshamrittradingcompany.com)`;
        break;
      case "list":
        replacement = `\n- ${selection}`;
        break;
      case "quote":
        replacement = `\n> ${selection}\n`;
        break;
      case "h2":
        replacement = `\n## ${selection}\n`;
        break;
      case "h3":
        replacement = `\n### ${selection}\n`;
        break;
      default:
        replacement = selection;
    }

    const nextText = currentText.substring(0, start) + replacement + currentText.substring(end);
    setBlogForm(prev => ({ ...prev, content: nextText }));
    
    // Reset focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2 + selection.length);
    }, 50);
  };

  // SEO Score calculation logic
  const calculateSeoScore = () => {
    let score = 30;
    if (blogForm.title.length > 25) score += 15;
    if (blogForm.seoTitle.length > 25) score += 15;
    if (blogForm.seoKeywords.split(",").length >= 3 || blogForm.seoKeywords.split(" ").length >= 4) score += 15;
    if (blogForm.seoDescription.length > 100) score += 20;
    if (blogForm.content.length > 400) score += 5;
    return Math.min(100, score);
  };

  const seoScore = calculateSeoScore();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6" id="blogs-tab-content">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-700" />
            <span>SEO & AI Discoverable Blog Insights</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Publish fully localized import-export intelligence briefs designed for search engine and AI deep discovery indexes.</p>
        </div>
        <button
          onClick={openNewBlogModal}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
          id="admin-new-blog-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Insights Post</span>
        </button>
      </div>

      {/* SEARCH AND CAPABILITY INDICATOR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 flex items-center space-x-3 bg-slate-50 p-2.5 rounded-lg border border-slate-205 shadow-inner">
          <Search className="w-4 h-4 text-slate-400 ml-2 animate-pulse" />
          <input
            type="text"
            placeholder="Search deployed corporate analysis briefs by title or writer..."
            className="w-full bg-transparent text-xs text-slate-800 outline-none border-none placeholder-slate-400 font-sans"
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
          />
        </div>
        <div className="md:col-span-4 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg flex items-center justify-between text-[11px] font-mono text-emerald-850 font-bold shadow-sm">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>GEO-OPTIMIZED TARGETS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] bg-slate-50 uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Article Description & Date</th>
              <th className="py-3 px-4 font-bold">Trading Category</th>
              <th className="py-3 px-4 font-bold">Sourcing Officer</th>
              <th className="py-3 px-4 text-center font-bold">Client Visibility</th>
              <th className="py-3 px-4 text-right font-bold h-10">Administrative Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-450 font-mono text-xs">
                  No matching localized analysis briefs found.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/60 group transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900 max-w-sm">
                    <span className="block font-bold text-[13px] hover:text-slate-800 transition" title={blog.title}>{blog.title}</span>
                    <span className="text-[10px] text-slate-450 mt-1 block font-mono font-semibold">
                      Created: {new Date(blog.createdDate).toLocaleDateString()} &bull; SEO URL: /{blog.slug}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono font-semibold text-[11px]">{blog.categoryName}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{blog.author}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePublishState(blog)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold cursor-pointer uppercase border tracking-wider transition ${
                        blog.published 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                      title="Syncs instantly to search index feeds"
                    >
                      {blog.published ? "Live / Index" : "Draft / Private"}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => openEditBlogModal(blog)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition shadow-sm cursor-pointer"
                      title="Edit SEO content parameters"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id, blog.title)}
                      className="p-1.5 rounded-lg border border-red-205 bg-white hover:bg-red-50 text-red-650 transition shadow-sm cursor-pointer"
                      title="Purge transaction brief"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* COMPACT MODAL FOR BLOG DRAFT / EDIT (FEATURES TINY-MCE COMPONENT & GOOGLE SERP PREVIEW) */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Modal Heading Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center shadow">
                  <Sparkles className="w-4 h-4 text-slate-100" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                    {editingBlog ? "Edit Deployed Trading Analysis Brief" : "Draft Secure Trade Intelligence Brief"}
                  </h3>
                  <p className="text-[10px] text-slate-505 font-mono">INTELLIGENCE TERMINAL ENGINE v1.2</p>
                </div>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-lg font-bold font-mono transition inline-block px-2 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Content - Scrollable Form */}
            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              
              {blogFormError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{blogFormError}</span>
                </div>
              )}

              {/* Grid 1: Basic parameters */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* Title */}
                <div className="md:col-span-8">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Article Display Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sourcing Recycled Carbon Steel Plates From Industrial Corridors in NCR"
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg outline-none focus:border-slate-550 shadow-sm"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, seoTitle: blogForm.seoTitle ? blogForm.seoTitle : e.target.value })}
                  />
                </div>

                {/* Category ID */}
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Trade Division Sector *
                  </label>
                  <select
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg outline-none focus:border-slate-550 shadow-sm cursor-pointer font-sans"
                    value={blogForm.categoryId}
                    onChange={(e) => setBlogForm({ ...blogForm, categoryId: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* GRID 2: Author, Ready Time & Image Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Sourcing Officer / Author
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Vessel / Route Visual Image URL
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 text-xs text-slate-850 p-3 rounded-lg shadow-sm font-mono text-[11px]"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  />
                </div>
              </div>

              {/* Quick Preset Image Select Helper */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">Select Export Image Preset:</span>
                <div className="flex gap-2">
                  {presetBlogImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, image: img })}
                      className="w-10 h-10 rounded border border-slate-250 overflow-hidden hover:scale-105 transition shadow-sm cursor-pointer"
                    >
                      <img src={img} alt="shipping" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* TinyMCE-styled Rich Text blogging area */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                
                {/* TinyMCE styled Command Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1.5 items-center justify-between">
                  {/* Toolbar actions */}
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertFormat("bold")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Bold text"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat("italic")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Italic text"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat("link")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Insert Hyperlink"
                    >
                      <Link className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button
                      type="button"
                      onClick={() => insertFormat("h2")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Main Heading (H2)"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat("h3")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Subheading (H3)"
                    >
                      <Heading3 className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button
                      type="button"
                      onClick={() => insertFormat("list")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Bullet point List"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat("quote")}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Blockquote paragraph"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Editor mode toggles (TinyMCE tabs Visual vs Base Source) */}
                  <div className="flex bg-slate-200 rounded p-0.5 text-[10px] font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setEditorMode("visual")}
                      className={`px-2.5 py-1 rounded transition ${
                        editorMode === "visual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Rich WYSIWYG
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("html")}
                      className={`px-2.5 py-1 rounded transition ${
                        editorMode === "html" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Raw code / Source
                    </button>
                  </div>
                </div>

                {/* Editor textarea canvas */}
                <div className="relative">
                  {editorMode === "visual" ? (
                    <div className="min-h-52 p-4 bg-white text-slate-800 text-xs font-sans whitespace-pre-wrap leading-relaxed select-none border-b border-transparent">
                      <textarea
                        ref={textareaRef}
                        required
                        className="w-full min-h-52 bg-white text-xs outline-none focus:none border-none resize-y text-slate-705 font-sans leading-relaxed"
                        placeholder="Establish deep trade specifications, details, port regulations, and legal compliance structures here..."
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      />
                    </div>
                  ) : (
                    <textarea
                      ref={textareaRef}
                      required
                      className="w-full min-h-52 p-4 bg-slate-950 font-mono text-[11px] text-amber-500 outline-none border-none resize-y shadow-inner block"
                      placeholder="<h3>Raw HTML Source Editor</h3>"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    />
                  )}
                </div>
                
                {/* Character Counter */}
                <div className="bg-slate-50 border-t border-slate-150 p-2 text-[10px] text-slate-500 font-mono font-semibold flex justify-between items-center px-4">
                  <span>Editor Status: System connected with secure storage buffer</span>
                  <span>Words: {blogForm.content ? blogForm.content.split(/\s+/).filter(Boolean).length : 0} &bull; Characters: {blogForm.content.length}</span>
                </div>
              </div>

              {/* Grid 3: Summary brief */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                  Meta Summary Card Snippet (Max 220 chars) *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={220}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm font-sans"
                  placeholder="Insert localized meta overview of high-yield steel machinery, food crop grades, or direct freight routing..."
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                />
              </div>

              {/* --------------------------------------------------------------------------------- */}
              {/* BRAND NEW SEO & AI DISCOVERABILITY SECTION CONFIGURED FOR SEARCH RANKINGS */}
              {/* --------------------------------------------------------------------------------- */}
              <div className="border border-slate-200 rounded-xl bg-slate-50 p-5 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-slate-850 animate-bounce" />
                      <span>Search Engine Optimization & AI Crawler configuration</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">Configure page headers, focus keywords, and schema markup to maximize Google Rank & Gemini Generative Discoverability.</p>
                  </div>
                  
                  {/* Realtime SEO Score card */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">AI Visibility Score:</span>
                    <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                      seoScore >= 80 ? "bg-emerald-150 text-emerald-800 border border-emerald-300" :
                      seoScore >= 50 ? "bg-amber-100 text-amber-800 border border-amber-250" :
                      "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      {seoScore}/100 Grade
                    </span>
                  </div>
                </div>

                {/* Sub Panel: SEO Title, SEO Keywords, SEO Description Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* SEO Title & Keywords */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                        SEO Meta Title Tag (Max 60 chars)
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        placeholder="e.g. Sourcing Recycled Sheet Metals and Raw Steel Plates | Gurgaon NCR"
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm focus:border-slate-500 transition-colors"
                        value={blogForm.seoTitle}
                        onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                      />
                      <span className="text-[9px] text-slate-450 font-semibold block mt-1">Leave blank to use the standard article display title automatically.</span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                        Focus SEO Keywords (Comma Separated)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. steel scrap, metal recycling, import export company, mokshamrit trading gurugram, bulk logistics india, cif shipping rotterdam"
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm font-sans"
                        value={blogForm.seoKeywords}
                        onChange={(e) => setBlogForm({ ...blogForm, seoKeywords: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* SEO Description */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                      SEO Meta Description Tag (Max 160 chars)
                    </label>
                    <textarea
                      rows={5}
                      maxLength={160}
                      placeholder="Secure industrial supplier Mokshamrit Trading coordinates high-density carbon steel shipments, premium agricultural grains, and machinery container cargo."
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm font-sans"
                      value={blogForm.seoDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, seoDescription: e.target.value })}
                    />
                    <div className="flex justify-between items-center text-[9px] text-slate-450 font-semibold mt-1">
                      <span>Google standard limits characters to exactly 160.</span>
                      <span>Left: {160 - blogForm.seoDescription.length} characters</span>
                    </div>
                  </div>
                </div>

                {/* VISUAL COMPONENT: GOOGLE SERP (SEARCH ENGINE RESULTS PAGE) SIMULATION PREVIEW */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 font-mono tracking-wider uppercase block">
                    Google Mobile & AI Search Snippet Preview Simulator:
                  </span>
                  
                  {/* Google snippet preview layout */}
                  <div className="space-y-1 text-left font-sans">
                    <div className="flex items-center space-x-1 text-[11px] text-slate-800">
                      <span className="font-semibold text-slate-900 font-mono text-[10px] block">https://mokshamrittradingcompany.com</span>
                      <span className="text-slate-400 font-mono text-[9px]">&rsaquo; blog &rsaquo; {blogForm.title ? blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "new-analysis"}</span>
                    </div>
                    <h5 className="text-[15px] text-[#1a0dab] hover:underline font-medium text-slate-900 font-bold tracking-tight cursor-help leading-snug">
                      {blogForm.seoTitle || blogForm.title || "Untitled Intelligence Sourcing brief"}
                    </h5>
                    <p className="text-[12px] text-slate-500 leading-normal font-sans text-slate-650">
                      <span className="text-slate-400 font-mono text-[10px]">{new Date().toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})} &mdash; </span>
                      {blogForm.seoDescription || blogForm.summary || "Setup your customizable SEO meta description details above to inspect how crawler algorithms and AI models index your import-export services."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid 4: Publish configuration */}
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="form-published"
                  className="w-4 h-4 text-slate-600 rounded cursor-pointer"
                  checked={blogForm.published}
                  onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                />
                <label htmlFor="form-published" className="text-xs font-bold uppercase tracking-wide text-slate-700 cursor-pointer select-none">
                  Publish instantly (Make live to client indexing systems)
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-205 rounded-xl text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Emanate Content Block</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
