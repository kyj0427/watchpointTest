"use client";

import dynamic from "next/dynamic";

// Dynamically import the VideoPlayer component without SSR
const DynamicVideoPlayer = dynamic(() => import("@/lib/plyr/Player"), {
  ssr: false,
  loading: () => <div></div>, // Optional: fallback
});

const VideoPlayer = (props) => {
  return <DynamicVideoPlayer {...props} />;
};

export default VideoPlayer;
