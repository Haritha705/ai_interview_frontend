'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/GlassCard';
import { RadarChart } from '@/components/RadarChart';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Award, Download, RotateCcw, CheckCircle2, AlertCircle, BookOpen, Sparkles, Share2 } from 'lucide-react';

export const ReportView: React.FC = () => {
  const { candidate, resetInterview, setActiveView, addToast } = useApp();

  // Launch celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
      });
    } catch {}
  }, []);

  const handleDownloadPdf = () => {
    addToast('success', 'Preparing PDF report download...');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.print();
      }
    }, 600);
  };

  const radarData = [
    { label: 'Technical Depth', score: 88 },
    { label: 'Communication', score: 92 },
    { label: 'Confidence', score: 85 },
    { label: 'System Design', score: 82 },
    { label: 'Problem Solving', score: 90 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-3xl glass-card border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-gray-900/80 to-purple-950/60 text-center space-y-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <Award className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Official Interview Certificate</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Interview Complete!</h1>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            Candidate <strong className="text-white">{candidate?.name || 'Alex Morgan'}</strong> evaluated for role <strong className="text-blue-400">{candidate?.role || 'Senior AI Developer'}</strong>.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Hiring Verdict: Recommended for Offer</span>
        </div>
      </motion.div>

      {/* Main Grid: Radar Chart & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Skill Radar Chart */}
        <GlassCard className="lg:col-span-6 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Performance Radar Chart
          </h3>
          <RadarChart data={radarData} size={300} />
          <p className="text-xs text-gray-400">Multi-dimensional evaluation normalized to 100%</p>
        </GlassCard>

        {/* Right Column: Score Metrics & Summary */}
        <GlassCard className="lg:col-span-6 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Score Breakdown</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-300">Technical Knowledge</span>
                <span className="text-blue-400 font-bold">8.8 / 10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-900 border border-white/10 overflow-hidden">
                <div className="h-full w-[88%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-300">Communication & Clarity</span>
                <span className="text-purple-400 font-bold">9.2 / 10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-900 border border-white/10 overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-300">Verbal Confidence</span>
                <span className="text-emerald-400 font-bold">8.5 / 10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-900 border border-white/10 overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-300">Overall Score</span>
                <span className="text-amber-400 font-bold">8.9 / 10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-900 border border-white/10 overflow-hidden">
                <div className="h-full w-[89%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recommended Learning Path */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-500/30">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recommended Personalized Learning Path</h3>
            <p className="text-xs text-gray-400">Tailored action items to achieve a perfect 10/10 score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-900/60 border border-white/5 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono font-bold">Module 1</span>
            <p className="font-bold text-white">LLM Context Windows & Chunking</p>
            <p className="text-gray-400">Study overlapping recursive splitters vs semantic boundary chunking.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/60 border border-white/5 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono font-bold">Module 2</span>
            <p className="font-bold text-white">Production Rate Limits & Fallbacks</p>
            <p className="text-gray-400">Review token bucket algorithm, exponential backoff, and circuit breakers.</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/60 border border-white/5 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono font-bold">Module 3</span>
            <p className="font-bold text-white">System Architecture Diagrams</p>
            <p className="text-gray-400">Practice whiteboarding microservices layout during verbal screens.</p>
          </div>
        </div>
      </GlassCard>

      {/* Buttons: Download PDF & Restart Interview */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <button
          onClick={() => {
            resetInterview();
            setActiveView('interview');
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/15 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>Restart Interview</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => addToast('info', 'Report link copied to clipboard')}
            className="flex-1 sm:flex-none px-5 py-3.5 rounded-xl border border-white/15 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Share Report</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-bold text-sm text-white gradient-bg-primary shadow-xl shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
