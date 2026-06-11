import { useState, useRef, React } from "react";
import type { FormEvent } from "react";
import { 
  FileText, Plus, Search, Edit3, Trash2, Eye, Sparkles, AlertCircle, HelpCircle,
  Bold, Italic, Link, List, Quote, Heading2, Heading3, Code, EyeOff, Save, CheckCircle, Upload, X, Image as ImageIcon
} from "lucide-react";
import type { BlogCategory, BlogItem } from "../../types";
import API_ENDPOINTS from "@/src/api/apiCall";

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
  console.log("AdminBlogs - Categories received:", categories);
  console.log("AdminBlogs - Categories length:", categories?.length);
  // Editor modes: "visual" or "html"
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");

  // Image upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Blog Form/Editor State
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    categoryId: "",
    author: "",
    readTime: "",
    image: "",
    published: true,
    seoTitle: "",
    seoKeywords: "",
    seoDescription: ""
  });
  const [blogFormError, setBlogFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setBlogForm(prev => ({
      ...prev,
      title: newTitle,
      slug: editingBlog ? prev.slug : generateSlug(newTitle) // Only auto-generate for new blogs
    }));
  };

  // Handle manual slug change
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    setBlogForm(prev => ({ ...prev, slug: newSlug }));
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setBlogFormError("Please upload a valid image file (JPEG, PNG, WEBP, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setBlogFormError("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setBlogFormError("");

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Image upload handler mein ye line change karo
const res = await fetch(API_ENDPOINTS.UPLOAD_BLOG_IMAGE, {
  method: 'POST',
  headers: {
    ...getAuthHeader()
    // Don't set Content-Type for FormData, browser will set it automatically
  },
  body: formData
});

      const data = await res.json();

      if (res.ok && data.success) {
        setBlogForm(prev => ({ ...prev, image: data.imageUrl }));
        setImagePreview(data.imageUrl);
        addActivity(`Uploaded image: ${data.imageUrl}`);
      } else {
        setBlogFormError(data.message || "Failed to upload image");
      }
    } catch (err) {
      setBlogFormError("Connection error while uploading image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setBlogForm(prev => ({ ...prev, image: "" }));
    setImagePreview("");
  };

  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      summary: "",
      content: "",
      categoryId: categories[0]?.id.toString() || "",
      author: "",
      readTime: "",
      image: "",
      published: true,
      seoTitle: "",
      seoKeywords: "",
      seoDescription: ""
    });
    setImagePreview("");
    setBlogFormError("");
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      summary: blog.summary || "",
      content: blog.content || "",
      categoryId: blog.categoryId?.toString() || "",
      author: blog.author || "",
      readTime: blog.readTime || "",
      image: blog.image || "",
      published: blog.published,
      seoTitle: blog.seoTitle || "",
      seoKeywords: blog.seoKeywords || "",
      seoDescription: blog.seoDescription || ""
    });
    setImagePreview(blog.image || "");
    setBlogFormError("");
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: FormEvent) => {
    e.preventDefault();
    setBlogFormError("");
    setIsSaving(true);

    // Validation
    if (!blogForm.title.trim()) {
      setBlogFormError("Please enter the blog title");
      setIsSaving(false);
      return;
    }

    if (!blogForm.slug.trim()) {
      setBlogFormError("Please enter a valid slug URL");
      setIsSaving(false);
      return;
    }

    if (!blogForm.summary.trim()) {
      setBlogFormError("Please enter a summary");
      setIsSaving(false);
      return;
    }

    if (!blogForm.content.trim()) {
      setBlogFormError("Please enter blog content");
      setIsSaving(false);
      return;
    }

    if (!blogForm.categoryId) {
      setBlogFormError("Please select a category");
      setIsSaving(false);
      return;
    }

    try {
      const isEdit = !!editingBlog;
      const url = isEdit
        ? API_ENDPOINTS.BLOG_UPDATE
        : API_ENDPOINTS.BLOG_CREATE;
      const method = "POST";

      const requestBody = {
        ...(isEdit && { id: editingBlog.id }),
        title: blogForm.title,
        slug: blogForm.slug,
        summary: blogForm.summary,
        content: blogForm.content,
        categoryId: parseInt(blogForm.categoryId),
        author: blogForm.author || "Admin",
        readTime: blogForm.readTime || "5 min read",
       image: blogForm.image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80", 
        published: blogForm.published ? 1 : 0,
        seoTitle: blogForm.seoTitle || blogForm.title,
        seoKeywords: blogForm.seoKeywords,
        seoDescription: blogForm.seoDescription || blogForm.summary
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        addActivity(isEdit ? `Modified blog post: "${blogForm.title}"` : `Created blog post: "${blogForm.title}"`);
        setIsBlogModalOpen(false);
        fetchAdminData();
      } else {
        setBlogFormError(data.message || data.error || "Failed to save blog");
      }
    } catch (err) {
      setBlogFormError("Connection error while saving blog");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (!window.confirm(`Permanently erase blog entry "${title}"?`)) return;
    try {
      const res = await fetch(API_ENDPOINTS.BLOG_DELETE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addActivity(`Erased blog entry ID: ${id}`);
        fetchAdminData();
      } else {
        alert(data.message || "Erase command rejected by database rules.");
      }
    } catch (err) {
      alert("System fault deploying delete triggers.");
    }
  };

  const togglePublishState = async (blog: BlogItem) => {
    try {
      const res = await fetch(API_ENDPOINTS.BLOG_UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          id: blog.id,
          published: !blog.published ? 1 : 0
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addActivity(`Toggled publication of "${blog.title}" to ${!blog.published}`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        replacement = `[${selection}](https://example.com)`;
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
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2 + selection.length);
    }, 50);
  };

  // SEO Score calculation logic
  const calculateSeoScore = () => {
    let score = 30;
    if (blogForm.title.length > 25) score += 10;
    if (blogForm.slug && blogForm.slug.length > 10) score += 10;
    if (blogForm.seoTitle.length > 25) score += 15;
    if (blogForm.seoKeywords && (blogForm.seoKeywords.split(",").length >= 3 || blogForm.seoKeywords.split(" ").length >= 4)) score += 15;
    if (blogForm.seoDescription.length > 100) score += 20;
    if (blogForm.content.length > 400) score += 5;
    if (blogForm.image) score += 5;
    return Math.min(100, score);
  };

  const seoScore = calculateSeoScore();

  // Filter listings
  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

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
                      Created: {blog.createdDate ? new Date(blog.createdDate).toLocaleDateString() : 'N/A'} &bull; SEO URL: /{blog.slug || 'blog'}
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

      {/* MODAL FOR BLOG DRAFT / EDIT */}
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

              {/* Grid 1: Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter blog title"
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg outline-none focus:border-slate-550 shadow-sm"
                    value={blogForm.title}
                    onChange={handleTitleChange}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    SEO Slug / URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="enter-blog-url-slug"
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg outline-none focus:border-slate-550 shadow-sm font-mono"
                    value={blogForm.slug}
                    onChange={handleSlugChange}
                  />
                  <p className="text-[9px] text-slate-400 mt-1">Unique URL identifier. Auto-generated from title for new blogs.</p>
                </div>
              </div>

              {/* Grid 2: Category and Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Category *
                  </label>
                  <select
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg outline-none focus:border-slate-550 shadow-sm cursor-pointer font-sans"
                    value={blogForm.categoryId}
                    onChange={(e) => setBlogForm({ ...blogForm, categoryId: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Author Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              {/* Grid 3: Read Time and Image Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    Featured Image
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      className="flex-1 bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm font-mono text-[11px]"
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {blogForm.image && (
                    <div className="mt-2 relative inline-block">
                      <img 
                        src={blogForm.image} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                  Summary / Excerpt (Max 220 chars) *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={220}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded-lg shadow-sm font-sans"
                  placeholder="Enter a brief summary of the blog post..."
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                />
                <div className="text-right text-[9px] text-slate-400 mt-1">
                  {blogForm.summary.length}/220 characters
                </div>
              </div>

              {/* Rich Text Content Editor */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                
                {/* Toolbar */}
                <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1">
                    <button type="button" onClick={() => insertFormat("bold")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Bold">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => insertFormat("italic")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Italic">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => insertFormat("link")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Link">
                      <Link className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button type="button" onClick={() => insertFormat("h2")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Heading 2">
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => insertFormat("h3")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Heading 3">
                      <Heading3 className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
                    <button type="button" onClick={() => insertFormat("list")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="List">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => insertFormat("quote")} className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition cursor-pointer" title="Quote">
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex bg-slate-200 rounded p-0.5 text-[10px] font-mono font-bold">
                    <button type="button" onClick={() => setEditorMode("visual")} className={`px-2.5 py-1 rounded transition ${editorMode === "visual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                      Visual
                    </button>
                    <button type="button" onClick={() => setEditorMode("html")} className={`px-2.5 py-1 rounded transition ${editorMode === "html" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
                      HTML
                    </button>
                  </div>
                </div>

                {/* Editor */}
                {editorMode === "visual" ? (
                  <textarea
                    ref={textareaRef}
                    required
                    className="w-full min-h-52 p-4 bg-white text-xs outline-none border-none resize-y text-slate-705 font-sans leading-relaxed"
                    placeholder="Write your blog content here... Use markdown syntax for formatting"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  />
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
                
                {/* Status */}
                <div className="bg-slate-50 border-t border-slate-150 p-2 text-[10px] text-slate-500 font-mono font-semibold flex justify-between items-center px-4">
                  <span>Markdown supported. Use toolbar for quick formatting.</span>
                  <span>Words: {blogForm.content ? blogForm.content.split(/\s+/).filter(Boolean).length : 0} &bull; Chars: {blogForm.content.length}</span>
                </div>
              </div>

              {/* SEO Section */}
              <div className="border border-slate-200 rounded-xl bg-slate-50 p-5 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-slate-850 animate-bounce" />
                      <span>SEO & AI Optimization</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">Configure meta tags for better search engine visibility</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">SEO Score:</span>
                    <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${
                      seoScore >= 80 ? "bg-emerald-100 text-emerald-800 border border-emerald-300" :
                      seoScore >= 50 ? "bg-amber-100 text-amber-800 border border-amber-200" :
                      "bg-red-100 text-red-800 border border-red-200"
                    }`}>
                      {seoScore}/100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                      SEO Title (Max 60 chars)
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      placeholder="SEO optimized title"
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm"
                      value={blogForm.seoTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                      SEO Description (Max 160 chars)
                    </label>
                    <textarea
                      rows={3}
                      maxLength={160}
                      placeholder="SEO meta description"
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm"
                      value={blogForm.seoDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, seoDescription: e.target.value })}
                    />
                    <div className="text-right text-[9px] text-slate-400 mt-1">
                      {160 - blogForm.seoDescription.length} chars left
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">
                      SEO Keywords (Comma separated)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded shadow-sm"
                      value={blogForm.seoKeywords}
                      onChange={(e) => setBlogForm({ ...blogForm, seoKeywords: e.target.value })}
                    />
                  </div>
                </div>

                {/* Google SERP Preview */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
                  <span className="text-[9px] font-bold text-slate-500 font-mono tracking-wider uppercase block mb-2">
                    Google Search Preview
                  </span>
                  <div className="space-y-1">
                    <div className="text-[11px] text-green-700 font-mono">
                      https://example.com/blog/{blogForm.slug || 'blog-post'}
                    </div>
                    <div className="text-[16px] text-[#1a0dab] font-medium hover:underline cursor-pointer">
                      {blogForm.seoTitle || blogForm.title || "Untitled"}
                    </div>
                    <div className="text-[12px] text-slate-600">
                      {blogForm.seoDescription || blogForm.summary || "Meta description will appear here..."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Publish Options */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="form-published"
                    className="w-4 h-4 text-slate-600 rounded cursor-pointer"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                  />
                  <label htmlFor="form-published" className="text-xs font-bold uppercase tracking-wide text-slate-700 cursor-pointer select-none">
                    Publish immediately
                  </label>
                </div>
                <div className="text-[10px] text-slate-400">
                  {blogForm.published ? "Blog will be visible to public" : "Blog will be saved as draft"}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{editingBlog ? "Update Blog" : "Create Blog"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}