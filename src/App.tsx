// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeToggle } from './components/ThemeToggle';


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

  return <HomePage onNavigateToAuth={() => setCurrentPage('auth')} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <ToastContainer position="bottom-right" theme="dark" limit={1} hideProgressBar={false}  />
    </ThemeProvider>
  );
}
