'use client';

import React from 'react';
import { useApp, PageView } from '@/context/AppContext';
import { Home, Mic, BarChart3, History, Settings, FileUp } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const menuItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'upload', label: 'Upload Resume', icon: <FileUp className="w-5 h-5" /> },
    { id: 'interview', label: 'Interview Studio', icon: <Mic className="w-5 h-5" /> },
    { id: 'report', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 glass-card p-4 flex flex-col justify-between shrink-0 h-[calc(100vh-6rem)] sticky top-20">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-purple-500/30 shadow-md shadow-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={isActive ? 'text-blue-400' : 'text-gray-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 text-center space-y-2">
        <p className="text-xs font-medium text-blue-300">AI Voice Assistant</p>
        <p className="text-[11px] text-gray-400">Personalized resume RAG interview active</p>
      </div>
    </aside>
  );
};
