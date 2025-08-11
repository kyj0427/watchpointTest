"use client";

import dynamic from "next/dynamic";

// Dynamically import the VideoPlayer component without SSR
const DynamicVideoPlayer = dynamic(() => import("@/lib/plyr/Player2"), {
  ssr: false,
  loading: () => <div></div>, // Optional: fallback
});

const VideoPlayer2 = (props) => {
  return <DynamicVideoPlayer {...props} />;
};

export default VideoPlayer2;
