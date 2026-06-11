import { useState, useEffect } from "react";
import { 
  LayoutDashboard, FileText, Mail, Settings as SettingsIcon, LogOut, Shield, Cpu 
} from "lucide-react";

// Extracted Modular Components
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminBlogs from "./components/AdminBlogs";
import AdminInquiries from "./components/AdminInquiries";
import AdminSettings from "./components/AdminSettings";
import AdminApiEndpoints from "./components/AdminApiEndpoints";
import type { BlogCategory, BlogItem, ContactInquiry, GlobalSettings } from "../types";
import API_ENDPOINTS from "@/src/api/apiCall";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "blogs" | "inquiries" | "settings" | "api">("dashboard");
  
  // Database datasets caching
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [recentActivities, setRecentActivities] = useState<string[]>([]);

  // Check login on startup
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("admin_token");
    return { "Authorization": `Bearer ${token}` };
  };

  const addActivity = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setRecentActivities(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    addActivity("Admin logged out of secure session terminal");
    window.location.reload();
  };

  const fetchAdminData = async () => {
    const headers = getAuthHeader();
    try {
      // Inquiries - GET all contact inquiries
      const inqRes = await fetch(API_ENDPOINTS.CONTACT_GET, { 
        headers: {
          ...headers,
          "Content-Type": "application/json"
        }
      });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        // Handle response format
        if (inqData.success && inqData.data) {
          setInquiries(inqData.data);
        } else if (Array.isArray(inqData)) {
          setInquiries(inqData);
        } else {
          setInquiries([]);
        }
        console.log("Inquiries loaded:", inqData);
      } else {
        console.error("Failed to fetch inquiries, status:", inqRes.status);
        setInquiries([]);
      }

      // Blogs - GET all blogs
      const blogRes = await fetch(API_ENDPOINTS.BLOG_GET, { 
        headers: {
          ...headers,
          "Content-Type": "application/json"
        }
      });
      if (blogRes.ok) {
        const bData = await blogRes.json();
        // Handle response format
        if (bData.success && bData.data) {
          setBlogs(bData.data);
        } else if (Array.isArray(bData)) {
          setBlogs(bData);
        } else {
          setBlogs([]);
        }
        console.log("Blogs loaded:", bData);
      } else {
        console.error("Failed to fetch blogs, status:", blogRes.status);
        setBlogs([]);
      }

      // Categories - GET all categories
      const catRes = await fetch(API_ENDPOINTS.CATEGORY_GET, { 
        headers: {
          ...headers,
          "Content-Type": "application/json"
        }
      });
      if (catRes.ok) {
        const cData = await catRes.json();
        // Handle response format: { success: true, count: number, data: [] }
        if (cData.success && cData.data) {
          setCategories(cData.data);
        } else if (Array.isArray(cData)) {
          setCategories(cData);
        } else {
          setCategories([]);
        }
        console.log("Categories loaded:", cData);
      } else {
        console.error("Failed to fetch categories, status:", catRes.status);
        setCategories([]);
      }

      // Settings - You need to create this endpoint or remove if not available
      try {
        const setRes = await fetch("/api/settings");
        if (setRes.ok) {
          const sData = await setRes.json();
          setSettings(sData);
        }
      } catch (err) {
        console.log("Settings endpoint not configured yet");
      }

      // Activity log
      setRecentActivities(prev => [
        `[${new Date().toLocaleTimeString()}] Data sync completed successfully.`,
        `[${new Date().toLocaleTimeString()}] Total blogs: ${blogs.length}, Categories: ${categories.length}, Inquiries: ${inquiries.length}`,
        ...prev.slice(0, 13)
      ]);
      
    } catch (err) {
      console.error("Failure fetching administrative metadata.", err);
      addActivity(`Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchAdminData();
    addActivity("Admin authenticated successfully. CSRF Handshake OK.");
  };

  // Login view fallback if not authorized
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans flex flex-col pt-24 pb-16 animate-fade-in" id="certified-admin-panel">
      
      {/* Top Admin Telemetry Ribbon banner */}
      <div className="bg-slate-900 border-b border-slate-950 py-3.5 px-4 sm:px-6 lg:px-8 mb-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-sm">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-100 font-bold">
              Secure Channel: <strong className="text-blue-400">admin@mokshamrittradingcompany.com</strong> (Sourced Node Active)
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white text-xs font-bold font-mono transition-all text-blue-400 border border-slate-700 inline-flex items-center space-x-1.5 cursor-pointer shadow"
            id="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Termination Session</span>
          </button>
        </div>
      </div>

      {/* Main Panel grid container workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Navigation Rail */}
        <div className="lg:col-span-3 flex flex-col space-y-1 bg-white border border-slate-200 rounded-xl p-3.5 h-fit shadow-sm">
          <div className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest px-3 py-2 border-b border-slate-100 mb-2 font-mono">
            Admin Sourcing Menus
          </div>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold tracking-wider flex items-center space-x-3 transition-all uppercase ${
              activeTab === "dashboard" ? "bg-slate-900 text-white shadow" : "hover:bg-slate-50 text-slate-600 hover:text-slate-950"
            }`}
            id="tab-dashboard-btn"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Sourcing Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold tracking-wider flex items-center space-x-3 transition-all uppercase ${
              activeTab === "blogs" ? "bg-slate-900 text-white shadow" : "hover:bg-slate-50 text-slate-600 hover:text-slate-950"
            }`}
            id="tab-blogs-btn"
          >
            <FileText className="w-4 h-4" />
            <span>SEO Blog Insights</span>
          </button>
          
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold tracking-wider flex items-center space-x-3 transition-all uppercase ${
              activeTab === "inquiries" ? "bg-slate-900 text-white shadow" : "hover:bg-slate-50 text-slate-600 hover:text-slate-950"
            }`}
            id="tab-inquiries-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Trade Leads ({inquiries.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold tracking-wider flex items-center space-x-3 transition-all uppercase ${
              activeTab === "settings" ? "bg-slate-900 text-white shadow" : "hover:bg-slate-50 text-slate-600 hover:text-slate-950"
            }`}
            id="tab-settings-btn"
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Company identities</span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold tracking-wider flex items-center space-x-3 transition-all uppercase ${
              activeTab === "api" ? "bg-slate-900 text-white shadow" : "hover:bg-slate-50 text-slate-600 hover:text-slate-950"
            }`}
            id="tab-api-btn"
          >
            <Cpu className="w-4 h-4" />
            <span>API Handshake Tester</span>
          </button>
        </div>

        {/* Right Side Working Canvas */}
        <div className="lg:col-span-9 flex flex-col space-y-6">
          {activeTab === "dashboard" && (
            <AdminDashboard 
              blogs={blogs} 
              inquiries={inquiries} 
              activities={recentActivities} 
              onNavigateTab={(tab) => setActiveTab(tab)} 
            />
          )}

          {activeTab === "blogs" && (
            <AdminBlogs 
              blogs={blogs} 
              categories={categories} 
              fetchAdminData={fetchAdminData} 
              addActivity={addActivity} 
              getAuthHeader={getAuthHeader} 
            />
          )}

          {activeTab === "inquiries" && (
            <AdminInquiries 
              inquiries={inquiries} 
              fetchAdminData={fetchAdminData} 
              addActivity={addActivity} 
              getAuthHeader={getAuthHeader} 
            />
          )}

          {activeTab === "settings" && (
            <AdminSettings 
              settings={settings} 
              fetchAdminData={fetchAdminData} 
              addActivity={addActivity} 
              getAuthHeader={getAuthHeader} 
            />
          )}

          {activeTab === "api" && (
            <AdminApiEndpoints />
          )}
        </div>

      </div>

    </div>
  );
}