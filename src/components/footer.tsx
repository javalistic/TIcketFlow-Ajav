import { Link } from "react-router-dom";
import { Ticket, Github, Twitter, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.02] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Ticket className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                TicketFlow
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mb-6">
              Modern ticket management solution that helps teams track, manage, 
              and resolve issues faster than ever before.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
              </a>
              <a 
                href="mailto:hello@ticketflow.com" 
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth/login" 
                  className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth/signup" 
                  className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group cursor-pointer">
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-purple-500 transition-colors" />
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group cursor-pointer">
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-purple-500 transition-colors" />
                  Support
                </span>
              </li>
              <li>
                <span className="text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-2 group cursor-pointer">
                  <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-purple-500 transition-colors" />
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border border-slate-300/50 flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              All systems operational
            </span>
           
          </div>
        </div>
      </div>

      {/* Gradient accent at top */}

    </footer>
  );
};

export default Footer;