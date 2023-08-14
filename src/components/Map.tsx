import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const token =
  "pk.eyJ1Ijoic2hhaGJhei1jYXBhYmwiLCJhIjoiY2xsMjZvM280MDUyYjNkbzV2N2QzdjI0aiJ9.eLYmjgVgqVPWg_w_Y0uUdw";
mapboxgl.accessToken = token;

export default function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Adjusted type for the map reference

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-1.3951067, 50.9058962],
      zoom: 10,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl: mapboxgl,
      marker: true,
    });

    // Add the search bar to the map
    map.current.addControl(geocoder, "top-left");

    // Add the draw tool to the map
    const draw = new MapboxDraw();
    map.current.addControl(draw, "top-right");

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      //   style={{ width: "100%", height: "100vh" }}
      // className="map-container"
    />
  );
}
