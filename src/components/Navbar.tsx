'use client';

import React from 'react';
import { useApp, PageView } from '@/context/AppContext';
import { Sparkles, Mic, FileText, LayoutDashboard, History, Settings, ShieldCheck, Wifi, WifiOff } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, backendStatus } = useApp();

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'upload', label: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'interview', label: 'AI Studio', icon: <Mic className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('landing')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              HirePrep <span className="gradient-text">AI</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Interview Prep Studio</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Backend Status & Quick Action */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/80 border border-white/10 text-xs text-gray-300">
            {backendStatus === 'connected' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Wifi className="w-3 h-3" /> Online
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Ready
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => setActiveView('interview')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white gradient-bg-primary hover:opacity-95 shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Mic className="w-4 h-4" />
            <span>Start Interview</span>
          </button>
        </div>
      </div>
    </header>
  );
};
