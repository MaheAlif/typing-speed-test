"use client";

import { useBackground } from "@/context/BackgroundContext";
import Stars from "./Stars";

export default function BackgroundStars() {
  const { backgroundType } = useBackground();
  
  if (backgroundType === "stars") {
    return <Stars />;
  }
  
  return null;
} 