'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/GlassCard';
import { Search, Calendar, Clock, Award, CheckCircle2, Play, ArrowUpDown } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { history, setActiveView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item =>
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-16">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Interview Logs</span>
          <h1 className="text-3xl font-extrabold text-white">Past Interview Sessions</h1>
          <p className="text-xs text-gray-400 mt-1">Track score progression and review historic AI evaluations.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* History Table Container */}
      <GlassCard className="p-0 overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900/80 border-b border-white/10 text-gray-400 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Role / Title</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-200">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-300 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {item.date}
                    </td>

                    <td className="px-6 py-4 font-semibold text-white">
                      {item.role}
                    </td>

                    <td className="px-6 py-4 font-bold text-emerald-400">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30">
                        <Award className="w-3.5 h-3.5" />
                        <span>{item.score}%</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item.duration}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setActiveView('report')}
                        className="px-3.5 py-1.5 rounded-lg bg-gray-900 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white hover:border-purple-500/40 transition-all"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No interview sessions found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Start New Session Trigger */}
      <div className="flex justify-end">
        <button
          onClick={() => setActiveView('interview')}
          className="px-6 py-3 rounded-xl font-bold text-xs text-white gradient-bg-primary hover:opacity-90 shadow-lg shadow-purple-500/20 flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start New Interview Session</span>
        </button>
      </div>
    </div>
  );
};
