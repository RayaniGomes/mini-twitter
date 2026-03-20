
import { Navbar } from './components/Navbar';
import { CreatePost } from './components/CreatePost';
import { PostCard } from './components/PostCard';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] text-[#FFFFFF] font-sans antialiased">
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
    </div>
  );
}
