// components/FadeInSection.jsx
import React, { useRef, useState, useEffect } from "react";

const FadeInSection = ({
  children,
  direction = "up", // can be 'up', 'down', 'left', 'right'
  delay = 0, // delay in milliseconds
}) => {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-8";
      case "down":
        return "-translate-y-8";
      case "left":
        return "translate-x-8";
      case "right":
        return "-translate-x-8";
      default:
        return "translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-1000 ease-in-out transform
        ${
          isVisible
            ? "opacity-100 translate-x-0 translate-y-0 scale-100"
            : `opacity-0 ${getDirectionClass()} scale-95`
        }
      `}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
