"use client";

import dynamic from "next/dynamic";

const DynamicCommunity = dynamic(
  () => import("./Community"), // Path to your original Community component
  { ssr: false }
);

const CommunityClient = () => {
  return <DynamicCommunity />;
};

export default CommunityClient;
