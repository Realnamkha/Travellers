import React from "react";
import Landing from "../sections/Home/Landing.jsx";
import Intro from "../sections/Home/Intro.jsx";
import Room from "../sections/Home/Room.jsx";
import FadeInSection from "../components/Fade_in.jsx"; // Make sure you're using the Framer one
import Reviews from "../sections/Home/Reviews.jsx";

const Home = () => {
  return (
    <main className="pt-[72px]">
      {/* Landing can stay static */}
      <Landing />

      {/* Intro Section with fade-in */}
      <div className="bg-gray-200">
        <FadeInSection direction="up" delay={0}>
          <Intro />
        </FadeInSection>
      </div>

      {/* Room and Reviews Section with fade-in */}
      <div className="bg-gray-200 min-h-screen">
        <FadeInSection direction="up" delay={0}>
          <Room />
        </FadeInSection>

        <FadeInSection direction="up" delay={200}>
          <Reviews />
        </FadeInSection>
      </div>
    </main>
  );
};

export default Home;
