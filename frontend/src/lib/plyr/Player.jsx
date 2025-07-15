"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Plyr from "plyr";

const Player = ({ videoSrc, posterSrc, videoTitle = "" }) => {
  useEffect(() => {
    const playerSelector = ".player";

    if (document.querySelector(playerSelector) !== null) {
      const controls = [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "pip",
        "fullscreen",
      ];

      const players = Plyr.setup(playerSelector, {
        muted: false,
        volume: 1,
        controls,
      });

      players.forEach((player) => {
        const container = player.elements.container;
        const customPoster = container.querySelector(".plyr_custom_poster");

        if (customPoster) {
          // Display poster initially
          customPoster.style.display = "block";

          // Event: Trigger play and hide the poster when clicked
          customPoster.addEventListener("click", () => {
            player.play(); // Play the video
            customPoster.style.display = "none"; // Hide the poster
          });

          // Event: Show the poster again when video is paused
          player.on("pause", () => {
            customPoster.style.display = "block";
          });

          // Event: Hide the poster when the video is playing
          player.on("play", () => {
            customPoster.style.display = "none";
          });

          // Pause the video if clicked outside the player
          document.addEventListener("click", (event) => {
            if (!container.contains(event.target)) {
              player.pause();
            }
          });
        }
      });

      // Cleanup function to destroy the Plyr instance when the component is unmounted
      return () => {
        players.forEach((player) => player.destroy());
      };
    }
  }, []);

  return (
    <div className="plyr__video-embed player relative">
      <Image className="plyr_custom_poster" src={posterSrc} alt="poster" />
      <iframe
        src={videoSrc}
        title={videoTitle}
        allowFullScreen
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default Player;
