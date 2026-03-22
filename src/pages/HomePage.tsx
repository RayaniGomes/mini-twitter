import { Navbar } from '../components/Navbar';
import { CreatePost } from '../components/CreatePost';
import { Feed } from '../components/Feed';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';
import type { HomePageProps } from '../interfaces/global.interface';

export function HomePage({ onNavigateToAuth }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] text-heading font-sans antialiased transition-colors duration-300">
      <Navbar onNavigateToAuth={onNavigateToAuth} />

      <main className="flex-1 w-full max-w-[640px] mx-auto px-6 py-6 flex flex-col gap-6">
        <CreatePost />
        <Feed />
      </main>

      <Footer />
      <ThemeToggle />
    </div>
  );
}
