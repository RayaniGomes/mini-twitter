// src/App.tsx
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { SunIcon, MoonIcon } from './components/Icons';
import { Navbar } from './components/Navbar';
import { CreatePost } from './components/CreatePost';
import { PostCard } from './components/PostCard';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] text-heading font-sans antialiased transition-colors duration-300">
        <Navbar />

        <main className="flex-1 w-full max-w-[640px] mx-auto px-6 py-6 flex flex-col gap-6">
          <CreatePost />

          <div className="flex flex-col gap-6">
            <PostCard 
              name="Lucas Costa"
              handle="@lucascosta"
              date="15/02/2026"
              title="Iniciando um novo processo seletivo! 🚀"
              content="Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below! #product #launch"
              image={{ text: "b2", highlight: "b", rest: "it", bgColor: "#002D5A" }}
              liked={true}
            />

            <PostCard 
              name="Lucas Costa"
              handle="@lucascosta"
              date="15/02/2026"
              title="Dark Mode is great!"
              content="Loving the dark mode update on this app. It's so much easier on the eyes at night when I'm doomscrolling 😂. Anyone else feel the same?"
              liked={false}
            />

            <PostCard 
              name="Lucas Costa"
              handle="@lucascosta"
              date="15/02/2026"
              title="Dark Mode is great!"
              content="Loving the dark mode update on this app. It's so much easier on the eyes at night when I'm doomscrolling 😂. Anyone else feel the same?"
              liked={false}
            />
          </div>

          <Pagination />
        </main>

        <Footer />

        {/* Floating theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-nav border border-edge text-muted shadow-lg hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
