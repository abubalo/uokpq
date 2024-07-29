import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Papers from "@/components/papers/Papers";

export default function Home() {
  return (
    <main className="w-full min-h-dvh">
      <Header />
      <Papers />
      <Footer />
    </main>
  );
}
