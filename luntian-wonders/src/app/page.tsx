import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* We will add the Quest Preview section here later */}
    </main>
  );
}