import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Key, Shield, Lock, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        onLoginSuccess();
      } else {
        setAuthError(data.error || "Authentication failed. Validate your credentials.");
      }
    } catch (err) {
      setAuthError("Network failure connecting to trade gateway model backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans py-24" id="admin-login-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative z-10" id="login-container-card">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md mb-3" id="admin-icon-brand">
            <Shield className="w-6 h-6 text-slate-100" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase font-sans">
            Administrative Gateway
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">
            Mokshamrit Trades HQ Terminal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" id="login-form-entry">
          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Security Username (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="admin@mokshamrittradingcompany.com"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-colors shadow-sm"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                id="login-username-input"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Access Keyword (Password)
              </label>
              <span className="text-[10px] text-slate-405 font-mono select-all font-bold">Mokshamrit@12M</span>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Password Code"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-colors shadow-sm"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                id="login-password-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white text-white font-bold tracking-wide text-sm transition-colors shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            id="login-submit-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Verify Credentials</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <span className="text-[10px] text-slate-400 tracking-wider inline-flex items-center space-x-1 uppercase">
            <span>Secure Ingress Shell</span>
            <span>&bull;</span>
            <span>AI Discoverability Node</span>
          </span>
        </div>
      </div>
    </div>
  );
}
