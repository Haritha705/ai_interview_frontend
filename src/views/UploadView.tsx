'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { uploadResumeApi } from '@/lib/api';
import { GlassCard } from '@/components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles, User, Briefcase, GraduationCap, Code, FolderGit2, ArrowRight } from 'lucide-react';

export const UploadView: React.FC = () => {
  const { setCandidate, setQuestions, setActiveView, addToast } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      addToast('error', 'Please upload a valid PDF document');
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      const data = await uploadResumeApi(file);
      setCandidate(data.resume);
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      }
      setUploadedSuccess(true);
      addToast('success', 'Resume parsed and interview guide generated!');
    } catch {
      addToast('error', 'Failed to parse PDF resume.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* View Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400">PDF Ingestion Engine</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Upload Your Resume</h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Our AI parser extracts skills, project context, and target role to generate custom RAG interview questions.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <GlassCard className="p-10 text-center relative overflow-hidden border-2 border-dashed border-white/15 hover:border-purple-500/50 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer flex flex-col items-center justify-center gap-4 py-8 rounded-2xl transition-all ${
            isDragging ? 'bg-purple-900/20 scale-[0.99]' : ''
          }`}
        >
          {/* Large Upload Illustration */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-3xl gradient-bg-primary flex items-center justify-center shadow-2xl shadow-purple-500/30"
            >
              <UploadCloud className="w-12 h-12 text-white" />
            </motion.div>

            {isUploading && (
              <div className="absolute inset-0 rounded-3xl bg-gray-950/80 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-base font-bold text-white">
              {isUploading
                ? 'Parsing resume text & generating RAG questions...'
                : 'Drag and drop your PDF resume here, or click to browse'}
            </p>
            <p className="text-xs text-gray-400">Accepts standard PDF documents up to 10MB</p>
          </div>

          {!isUploading && (
            <button className="mt-2 px-6 py-2.5 rounded-xl bg-gray-900 border border-white/15 text-xs font-semibold text-gray-200 hover:text-white hover:border-purple-500/50 transition-all">
              Select PDF File
            </button>
          )}
        </div>
      </GlassCard>

      {/* Upload Success & Candidate Breakdown */}
      <AnimatePresence>
        {uploadedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Successfully parsed <strong>{uploadedFileName}</strong>! AI interview studio is ready.</span>
              </div>
              <button
                onClick={() => setActiveView('interview')}
                className="px-4 py-2 rounded-xl gradient-bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 hover:scale-105 transition-transform"
              >
                <span>Proceed to Interview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Candidate Extracted Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Info & Role */}
              <GlassCard className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Candidate Identity</span>
                    <h3 className="text-lg font-bold text-white">Parsed Profile</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Candidate Name</span>
                    <span className="font-semibold text-white">Alex Morgan</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-gray-400">Detected Target Role</span>
                    <span className="font-semibold text-blue-400">Senior AI Full-Stack Developer</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">Interview Readiness</span>
                    <span className="font-semibold text-emerald-400">88% High Match</span>
                  </div>
                </div>
              </GlassCard>

              {/* Skills Chips */}
              <GlassCard className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Technical Profile</span>
                    <h3 className="text-lg font-bold text-white">Extracted Skills</h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'Tailwind CSS', 'RAG', 'Vector DBs'].map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-gray-900 border border-white/10 text-xs font-medium text-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Projects */}
              <GlassCard className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                    <FolderGit2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Portfolio Highlights</span>
                    <h3 className="text-lg font-bold text-white">Extracted Projects</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-gray-900/60 border border-white/5 space-y-1">
                    <p className="font-semibold text-white">HirePrep AI Voice Platform</p>
                    <p className="text-gray-400">Conversational resume mock interview with real-time speech synthesis.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900/60 border border-white/5 space-y-1">
                    <p className="font-semibold text-white">Distributed Vector Database Pipeline</p>
                    <p className="text-gray-400">Scalable document embedding and hybrid retrieval architecture.</p>
                  </div>
                </div>
              </GlassCard>

              {/* Experience & Education */}
              <GlassCard className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Background</span>
                    <h3 className="text-lg font-bold text-white">Experience & Education</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white">Full Stack Engineer</p>
                      <p className="text-gray-400">Tech Innovation Labs</p>
                    </div>
                    <span className="text-gray-500 font-mono">2024 - Present</span>
                  </div>
                  <div className="flex justify-between items-start pt-2 border-t border-white/5">
                    <div>
                      <p className="font-semibold text-white">B.S. Computer Science & Engineering</p>
                      <p className="text-gray-400">Institute of Technology</p>
                    </div>
                    <span className="text-gray-500 font-mono">2020 - 2024</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
