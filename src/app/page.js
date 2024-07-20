import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementSection from "./components/AchievementSection";

export default function Home() {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="w-full px-4 py-14 lg:px-12 lg:py-16 flex-grow">
        <section className="bg-gray-900  rounded-none  p-8 lg:p-12 w-full">
          <HeroSection />
        </section>
        <section className="bg-gray-900  rounded-none  lg:mb-12 p-8 lg:p-12 w-full">
          <AchievementSection />
        </section>
        <section className="bg-gray-700  rounded-none  py-8  lg:p-12 w-full">
          <AboutMe />
        </section>
        <section className="bg-gray-900  rounded-none  p-8 lg:p-12 w-full">
          <Projects />
        </section>
        <section className="bg-gray-700  rounded-none  p-8 lg:p-12 w-full">
          <EmailSection />
        </section>
      </div>
      <Footer />
    </main>
  );
}
