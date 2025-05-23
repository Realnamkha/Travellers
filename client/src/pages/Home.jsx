import React from "react";
import Landing from "../sections/Home/Landing.jsx";
import Intro from "../sections/Home/Intro.jsx";
import Room from "../sections/Home/Room.jsx";
import FadeInSection from "../components/Fade_in.jsx";

const Home = () => {
  return (
    <main className="pt-[72px]">
      <Landing />

      <FadeInSection>
        <Intro />
      </FadeInSection>

      <FadeInSection>
        <Room />
      </FadeInSection>
    </main>
  );
};

export default Home;
