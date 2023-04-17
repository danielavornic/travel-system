/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { decode } from "polyline";
import "mapbox-gl/dist/mapbox-gl.css";

import { useAppContext } from "@/hooks";

const initViewport = {
  latitude: 47.0105,
  longitude: 28.5,
  zoom: 7,
  width: "calc(100vw - 512px)",
};

export const RoutesMap = () => {
  const [viewstate, setViewstate] = useState<any>(initViewport);
  const mapRef = useRef<any>(null);

  const { selectedRoute } = useAppContext();
  const { paths } = selectedRoute || {
    paths: [],
  };
  const [endpoints, setEndpoints] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  const handleLoad = (e: any) => {
    e.target.addSource("paths", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: paths?.map((path) => ({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: decode(path).map(([longitude, latitude]) => [latitude, longitude]),
          },
          properties: {},
        })),
      },
    });

    e.target.addLayer({
      id: "paths",
      type: "line",
      source: "paths",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#66cc8a",
        "line-width": 3,
      },
    });
  };

  useEffect(() => {
    if (!selectedRoute) {
      setEndpoints([]);

      if (mapRef.current && paths) {
        mapRef.current.getMap().getSource("paths")?.setData({
          type: "FeatureCollection",
          features: [],
        });
      }

      return;
    }

    if (mapRef.current && paths) {
      mapRef.current
        .getMap()
        .getSource("paths")
        ?.setData({
          type: "FeatureCollection",
          features: paths?.map((path) => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: decode(path).map(([longitude, latitude]) => [latitude, longitude]),
            },
            properties: {},
          })),
        });

      const decodedRoute = paths.map((path) =>
        decode(path).map(([longitude, latitude]) => [latitude, longitude]),
      );

      setEndpoints(
        [
          {
            longitude: decodedRoute[0]?.[0][0],
            latitude: decodedRoute[0]?.[0][1],
          },
          {
            longitude:
              decodedRoute[decodedRoute.length - 1]?.[
                decodedRoute?.[decodedRoute.length - 1]?.length - 1
              ][0],
            latitude:
              decodedRoute[decodedRoute.length - 1]?.[
                decodedRoute?.[decodedRoute.length - 1]?.length - 1
              ][1],
          },
        ].filter((endpoint) => endpoint.longitude && endpoint.latitude),
      );

      const bounds = decodedRoute.reduce(
        (bounds: any, path: any) =>
          path.reduce(
            (bounds: any, coord: any) => [
              [Math.min(bounds[0][0], coord[0]), Math.min(bounds[0][1], coord[1])],
              [Math.max(bounds[1][0], coord[0]), Math.max(bounds[1][1], coord[1])],
            ],
            bounds,
          ),
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ],
      );

      if (bounds[0][0] === Infinity || bounds[0][0] === -Infinity) {
        setError("No route found");
        return;
      }

      setError(null);

      const viewport = new mapboxgl.LngLatBounds(bounds[1], bounds[0]);

      mapRef.current.getMap().fitBounds(viewport, {
        padding: 80,
      });
    }
  }, [selectedRoute]);

  return (
    <MapGL
      {...viewstate}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: "calc(100vw - 512px)", height: "100vh" }}
      onMove={(e) => setViewstate(e.viewState)}
      onLoad={handleLoad}
    >
      {endpoints.length > 0 &&
        endpoints.map((location: any) => (
          <Marker key={location.title} latitude={location.latitude} longitude={location.longitude}>
            <button className="marker-btn">
              <img src="/images/marker.svg" alt="location Marker" width="30" />
            </button>
          </Marker>
        ))}

      {(error || endpoints.length === 0) && (
        <div>
          <div className="card bg-white w-full max-w-lg mx-auto block z-40 p-4 shadow-lg absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-lg font-semibold text-center">
              There was an error while trying to find this route.
            </p>
          </div>
          <div className="w-full h-full absolute top-0 bg-gray-50 opacity-70" />
        </div>
      )}
    </MapGL>
  );
};
