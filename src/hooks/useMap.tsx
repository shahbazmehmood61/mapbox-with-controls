import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const token =
  "pk.eyJ1Ijoic2hhaGJhei1jYXBhYmwiLCJhIjoiY2xsMjZvM280MDUyYjNkbzV2N2QzdjI0aiJ9.eLYmjgVgqVPWg_w_Y0uUdw";
mapboxgl.accessToken = token;

function useMap(mapContainer: React.RefObject<HTMLDivElement>) {
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-1.3951067, 50.9058962], // southampton [lat, lng]
      zoom: 10,
      attributionControl: true,
      touchZoomRotate: true,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl: mapboxgl,
      marker: true,
    });

    // Add the search bar to the map
    map.current.addControl(geocoder, "top-left");

    // Add the full screen tool to the map
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add the draw tool to the map
    const draw = new MapboxDraw();
    map.current.addControl(draw, "top-right");

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  }, []);

  return [map];
}

export default useMap;
