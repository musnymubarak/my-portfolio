import Image from "next/image";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black container mx-auto px-12 py-10">
      <NavBar/>
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <br />
        <AboutMe />
      </div>
    </main>
  );
}
