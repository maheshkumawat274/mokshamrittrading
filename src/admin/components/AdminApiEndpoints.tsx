import { useState } from "react";
import { Play, Code, CheckCircle, AlertTriangle, ShieldAlert, Cpu, Terminal, RefreshCw, Layers } from "lucide-react";

export default function AdminApiEndpoints() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>("GET /api/settings");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<any>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);

  // List of active endpoints with their parameters and authorization details
  const endpointsList = [
    {
      id: "GET /api/settings",
      path: "/api/settings",
      method: "GET",
      secure: false,
      description: "Retrieves global corporate details, address locations, and active default search indexing configurations.",
    },
    {
      id: "GET /api/blog_categories",
      path: "/api/blog_categories",
      method: "GET",
      secure: false,
      description: "Lists active international trade sourcing sectors (Apparel, Agriculture, Metal Alloys, Machinery).",
    },
    {
      id: "GET /api/blogs",
      path: "/api/blogs",
      method: "GET",
      secure: false,
      description: "Returns client-visible research articles optimized for search and AI discovery indexes.",
    },
    {
      id: "GET /api/blogs?includeUnpublished=true",
      path: "/api/blogs?includeUnpublished=true",
      method: "GET",
      secure: true,
      description: "Protected administrative view retrieves all blogs including drafts.",
    },
    {
      id: "GET /api/inquiries",
      path: "/api/inquiries",
      method: "GET",
      secure: true,
      description: "Protected administrative access. Retrieves raw contact inquiries and letter of credit leads.",
    }
  ];

  const handleTestCall = async () => {
    setLoading(true);
    setResponseBody(null);
    setResponseStatus(null);
    setResponseTime(null);
    setResponseHeaders(null);

    const start = performance.now();
    const endpoint = endpointsList.find(e => e.id === activeEndpoint);
    if (!endpoint) {
      setLoading(false);
      return;
    }

    try {
      const headers: any = {};
      
      // If endpoint is secure, append token
      if (endpoint.secure) {
        const token = localStorage.getItem("admin_token");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const res = await fetch(endpoint.path, {
        method: endpoint.method,
        headers
      });

      const end = performance.now();
      const duration = Math.round(end - start);

      setResponseTime(duration);
      setResponseStatus(`${res.status} ${res.statusText}`);
      
      const resHeadersObj: any = {};
      res.headers.forEach((value, name) => {
        resHeadersObj[name] = value;
      });
      setResponseHeaders(resHeadersObj);

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setResponseBody(JSON.stringify(json, null, 2));
      } catch {
        setResponseBody(text);
      }
    } catch (err: any) {
      const end = performance.now();
      setResponseTime(Math.round(end - start));
      setResponseStatus("Fetch Connection Failure");
      setResponseBody(err.message || "Failed to establish cross-origin handshake with node model.");
    } finally {
      setLoading(false);
    }
  };

  const selectedEndpointObj = endpointsList.find(e => e.id === activeEndpoint);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm" id="api-endpoints-tab-content">
      <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-slate-705" />
            <span>Developer API Endpoint Registry & Live Terminal</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Directly trigger, query, and debug live API routes that serve the Mokshamrit Trading front-end application.</p>
        </div>
        <span className="text-[10px] font-mono bg-blue-50 border border-blue-150 px-3 py-1 rounded-full text-blue-700 font-bold uppercase tracking-wider">
          Node Sourcing Engine v1.2
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-705">
        
        {/* Left column: Endpoints Selection */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] text-slate-455 font-mono font-bold uppercase tracking-wider block">Available API Routers:</span>
          
          <div className="space-y-2.5">
            {endpointsList.map((endpoint) => (
              <button
                key={endpoint.id}
                type="button"
                onClick={() => {
                  setActiveEndpoint(endpoint.id);
                  setResponseBody(null);
                  setResponseStatus(null);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1 cursor-pointer ${
                  activeEndpoint === endpoint.id 
                    ? "bg-slate-900 border-slate-950 text-white shadow" 
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-750"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    endpoint.method === "GET" 
                      ? activeEndpoint === endpoint.id ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-700"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {endpoint.method}
                  </span>
                  
                  {endpoint.secure && (
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#d97706] flex items-center gap-1 uppercase bg-amber-50 px-1 rounded">
                      <ShieldAlert className="w-3 h-3" />
                      <span>SECURE</span>
                    </span>
                  )}
                </div>
                
                <span className="font-mono text-xs block font-bold truncate mt-1.5">{endpoint.path}</span>
                <p className={`text-[10px] leading-relaxed mt-1 font-sans ${
                  activeEndpoint === endpoint.id ? "text-slate-300 font-light" : "text-slate-500"
                }`}>
                  {endpoint.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Interactive Sandbox Query Runner */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Query Details Indicator */}
          <div className="bg-slate-50 border border-slate-201 rounded-xl p-4 space-y-3 shadow-inner">
            <span className="text-[9px] font-bold text-slate-500 font-mono uppercase tracking-wider block">Sandbox Target Request Headers:</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">HTTP Target Route</span>
                <span className="font-bold text-slate-900 block">{selectedEndpointObj?.method} {selectedEndpointObj?.path}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">Authorization header</span>
                <span className="font-bold text-slate-900 block">{selectedEndpointObj?.secure ? "Bearer [MokshamritSecureSysToken]" : "None Required"}</span>
              </div>
            </div>

            <button
              onClick={handleTestCall}
              disabled={loading}
              className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>DISPATCHING QUERY PACKAGE...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-white" />
                  <span>EXECUTE DYNAMIC API CALL</span>
                </>
              )}
            </button>
          </div>

          {/* Test Call response console logs */}
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-900 overflow-hidden flex flex-col shadow-lg min-h-72">
            {/* Header tab for debugger */}
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-950 font-mono text-[10px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>RESPONSE CANVAS CONSOLE</span>
              </span>
              
              {responseTime && (
                <span className="text-slate-400 font-bold bg-slate-950 px-1.5 py-0.5 rounded">
                  SPEED: <strong className="text-emerald-500">{responseTime}ms</strong>
                </span>
              )}
            </div>

            {/* HTTP Status Indicators */}
            {responseStatus && (
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-950 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[10px]">HTTP STATUS:</span>
                  <span className={`font-extrabold ${
                    responseStatus.startsWith("2") ? "text-emerald-400" : "text-amber-500"
                  }`}>
                    {responseStatus}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>OK CONNECTION</span>
                </div>
              </div>
            )}

            {/* Code Output Canvas screen */}
            <div className="flex-1 p-4 overflow-auto max-h-96 font-mono text-xs text-slate-200">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs py-16 gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-slate-500" />
                  <span>TRANSMITTING COURIER DATA SIGNALS OVER SECURED SOCKETS...</span>
                </div>
              ) : responseBody ? (
                <pre className="text-left font-mono leading-relaxed whitespace-pre font-light select-text">
                  {responseBody}
                </pre>
              ) : (
                <span className="text-slate-650 italic text-[11px] block text-center py-24">
                  Select a registered import-export API route to query and click "EXECUTE DYNAMIC API CALL" to capture live node responses.
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
