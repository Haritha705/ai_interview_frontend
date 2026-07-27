'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { checkBackendHealth } from '@/lib/api';
import { LandingView } from '@/views/LandingView';
import { DashboardView } from '@/views/DashboardView';
import { UploadView } from '@/views/UploadView';
import { InterviewView } from '@/views/InterviewView';
import { EvaluationView } from '@/views/EvaluationView';
import { ReportView } from '@/views/ReportView';
import { HistoryView } from '@/views/HistoryView';
import { SettingsView } from '@/views/SettingsView';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { activeView, setBackendStatus } = useApp();

  // Check backend health on initial load
  useEffect(() => {
    async function verifyHealth() {
      const result = await checkBackendHealth();
      setBackendStatus(result.status as 'connected' | 'offline');
    }
    verifyHealth();
  }, [setBackendStatus]);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'landing':
        return <LandingView />;
      case 'dashboard':
        return <DashboardView />;
      case 'upload':
        return <UploadView />;
      case 'interview':
        return <InterviewView />;
      case 'evaluation':
        return <EvaluationView />;
      case 'report':
        return <ReportView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <main className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
