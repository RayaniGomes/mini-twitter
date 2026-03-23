// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeToggle } from './components/ThemeToggle';
import { useAuthStore } from './stores/authStore';


type Page = 'home' | 'auth';

function AppContent() {
  const { isAuthenticated } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<Page>(isAuthenticated() ? 'home' : 'auth');

  if (currentPage === 'home') {
    return (
      <>
        <AuthPage onNavigateHome={() => setCurrentPage('auth')} />
        <ThemeToggle />
      </>
    );
  }

  return <HomePage onNavigateToAuth={() => setCurrentPage('home')} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <ToastContainer position="bottom-right" theme="dark" limit={1} hideProgressBar={false}  />
    </ThemeProvider>
  );
}
