"use client";

import { useTheme } from "@/context/ThemeContext";
import { useBackground } from "@/context/BackgroundContext";

export default function BackgroundToggle() {
  const { backgroundType, setBackgroundType } = useBackground();
  const { theme } = useTheme();

  const toggleBackground = () => {
    setBackgroundType(backgroundType === "none" ? "stars" : "none");
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={toggleBackground}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          backgroundType === "stars"
            ? "bg-neon-blue text-white shadow-lg shadow-neon-blue/50"
            : theme === "dark"
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        }`}
      >
        {backgroundType === "stars" ? "🌌 Stars" : "🌌 Stars"}
      </button>
    </div>
  );
} 