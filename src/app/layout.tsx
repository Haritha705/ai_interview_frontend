import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { ToastContainer } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HirePrep AI - AI Resume Interview Preparation Platform',
  description: 'Practice personalized AI-powered resume interviews with real-time voice interaction, instant feedback, and detailed performance analysis.',
  keywords: ['AI Interview', 'Resume Parser', 'Interview Practice', 'Voice AI', 'RAG Questions', 'HirePrep AI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-dark-primary text-gray-100 min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
