import { useEffect, useRef } from "react";
import useMap from "@/hooks/useMap";

export default function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map] = useMap(mapContainer);

  useEffect(() => {
    console.log(map.current);
  }, [map]);

  return <div id="map" ref={mapContainer} />;
}
