"use client";
import MapDetails from "./MapDetails";

export default function Wrapper({ mapName }: { mapName: string }) {
  return <MapDetails mapName={mapName} />;
}
