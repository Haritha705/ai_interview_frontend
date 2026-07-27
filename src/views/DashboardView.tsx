'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { User, Award, Code, FolderGit2, Mic, Play, FileUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { candidate, setActiveView, questions } = useApp();

  const readinessScore = candidate?.readiness_score || 88;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8 w-full">
          {/* Welcome Header Banner */}
          <GlassCard glow="purple" className="relative overflow-hidden p-8 border-purple-500/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-semibold text-purple-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Resume Ready</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white">
                  Welcome back, <span className="gradient-text">{candidate?.name || 'Candidate'}</span>!
                </h1>
                <p className="text-sm text-gray-300 max-w-lg">
                  Target Role Detected: <span className="text-blue-400 font-semibold">{candidate?.role || 'Senior Software Engineer'}</span>
                </p>
              </div>

              <button
                onClick={() => setActiveView('interview')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white gradient-bg-primary shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
              >
                <Mic className="w-4 h-4" />
                <span>Start AI Voice Session</span>
              </button>
            </div>
          </GlassCard>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Readiness Score Progress Circle Card */}
            <GlassCard className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#scoreGrad)"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 32}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - readinessScore / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-base font-extrabold text-white">{readinessScore}%</span>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium">Interview Readiness</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">High Match</p>
                <p className="text-[11px] text-gray-500 mt-1">Based on resume analysis</p>
              </div>
            </GlassCard>

            {/* Extracted Skills Count */}
            <GlassCard className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Extracted Skills</p>
                <p className="text-xl font-extrabold text-white">{candidate?.skills?.length || 8}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Technical chips identified</p>
              </div>
            </GlassCard>

            {/* Extracted Projects Count */}
            <GlassCard className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shrink-0">
                <FolderGit2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Parsed Projects</p>
                <p className="text-xl font-extrabold text-white">{candidate?.projects?.length || 2}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Key portfolio items</p>
              </div>
            </GlassCard>

            {/* Questions Queued */}
            <GlassCard className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">RAG Questions</p>
                <p className="text-xl font-extrabold text-white">{questions.length}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Tailored interview queue</p>
              </div>
            </GlassCard>
          </div>

          {/* Details Breakdown: Skills Chips & Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Extracted Skills */}
            <GlassCard className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Extracted Technical Skills
                </h3>
                <span className="text-xs text-gray-400">{candidate?.skills?.length || 0} Skills</span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {candidate?.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-gray-900/90 border border-white/10 text-xs font-semibold text-gray-200 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                  >
                    {skill}
                  </span>
                )) || <p className="text-xs text-gray-400">No skills parsed yet.</p>}
              </div>
            </GlassCard>

            {/* Extracted Projects */}
            <GlassCard className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-purple-400" />
                  Key Extracted Projects
                </h3>
                <span className="text-xs text-gray-400">RAG Context</span>
              </div>

              <div className="space-y-3 pt-2">
                {candidate?.projects?.map((proj, idx) => {
                  const title = typeof proj === 'string' ? proj : proj.title;
                  const desc = typeof proj === 'string' ? '' : proj.description;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-gray-900/60 border border-white/5 space-y-1">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {title}
                      </p>
                      {desc && <p className="text-xs text-gray-400 pl-6">{desc}</p>}
                    </div>
                  );
                }) || <p className="text-xs text-gray-400">No projects found.</p>}
              </div>
            </GlassCard>
          </div>

          {/* Quick Start Action Bar */}
          <GlassCard className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-gray-900/40 border-blue-500/20">
            <div>
              <h4 className="text-base font-bold text-white">Ready for your real-time mock interview?</h4>
              <p className="text-xs text-gray-400 mt-1">Our AI will ask role-specific questions and evaluate your audio responses live.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveView('upload')}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <FileUp className="w-4 h-4 text-purple-400" />
                <span>Change Resume</span>
              </button>

              <button
                onClick={() => setActiveView('interview')}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs text-white gradient-bg-primary hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch AI Interview</span>
              </button>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
};
