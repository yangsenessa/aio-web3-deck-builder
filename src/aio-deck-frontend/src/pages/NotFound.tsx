import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1117] p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 blur-3xl" />
          <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600/20 to-fuchsia-600/20 border border-white/10">
            <AlertCircle className="w-16 h-16 text-indigo-400" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-slate-200 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-slate-200 hover:border-white/30 hover:bg-white/5 transition-all"
          >
            <Search size={20} />
            Learn More
          </Link>
        </div>
        
        <p className="text-xs text-slate-500 mt-8">
          Error path: <code className="text-slate-400">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
