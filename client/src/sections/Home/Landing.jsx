import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const images = ["/11.jpg", "/12.jpg"];

const Landing = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[100vh] flex items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      {/* Transparent text box */}
      <div className="relative z-10 max-w-4xl mx-auto p-8 rounded-lg bg-black/30 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to Travellers Guest House
        </h2>
        <Button className="bg-gray-600">Book Now</Button>
      </div>
    </section>
  );
};

export default Landing;
