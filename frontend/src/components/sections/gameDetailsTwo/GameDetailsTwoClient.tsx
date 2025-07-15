"use client";

import { useEffect, useState } from "react";
import GameDetailsTwo from "./GameDetailsTwo";

const GameDetailsTwoClient = () => {
  const [isClient, setIsClient] = useState(false);

  // Set `isClient` to true once the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing or a fallback UI during SSR
    return null;
  }

  return <GameDetailsTwo />;
};

export default GameDetailsTwoClient;
