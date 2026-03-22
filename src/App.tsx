// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { CreatePost } from './components/CreatePost';
import { Footer } from './components/Footer';
import { AuthPage } from './pages/AuthPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeToggle } from './components/ThemeToggle';
import { Feed } from './components/Feed';


type Page = 'home' | 'auth';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  if (currentPage === 'auth') {
    return (
      <>
        <AuthPage onNavigateHome={() => setCurrentPage('home')} />
        <ThemeToggle />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] text-heading font-sans antialiased transition-colors duration-300">
      <Navbar onNavigateToAuth={() => setCurrentPage('auth')} />

      <main className="flex-1 w-full max-w-[640px] mx-auto px-6 py-6 flex flex-col gap-6">
        <CreatePost />
        <Feed />
      </main>

      <Footer />
      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <ToastContainer position="bottom-right" theme="dark" limit={1} hideProgressBar={false}  />
    </ThemeProvider>
  );
}
