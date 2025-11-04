import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wallet } from "lucide-react";
import WalletButton from "./WalletButton";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "AIO", href: "/aio" },
    { name: "Univoice", href: "/univoice" },
    { name: "PMug", href: "/pmug" },
    { name: "About AIO", href: "/about" },
  ];

  const socialLinks = [
    { name: "X", href: "https://x.com/aio2030", icon: "𝕏" },
    { name: "Discord", href: "https://discord.gg/aio2030", icon: "D" },
    { name: "Telegram", href: "https://t.me/aio2030", icon: "T" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0E1117] text-slate-200">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0E1117]/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/aio_app_icon.png"
              alt="AIO2030"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              AIO2030
            </span>
          </Link>

          {/* Right Section: Social Links + Wallet */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Social Links */}
            <div className="hidden sm:flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5 transition-all text-sm"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] 
            bg-[#0E1117]/95 backdrop-blur-md
            border-r border-white/10 
            transition-transform duration-300 ease-in-out z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            w-64
          `}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  block px-4 py-3 rounded-xl font-medium transition-all
                  ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-indigo-600/20 to-fuchsia-600/20 text-white border border-white/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Social Links */}
          <div className="sm:hidden absolute bottom-4 left-4 right-4">
            <div className="flex justify-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5 transition-all"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 overflow-x-hidden">
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;

