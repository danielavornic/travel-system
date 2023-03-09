/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { decode } from "polyline";
import "mapbox-gl/dist/mapbox-gl.css";

import { useSharedInputs } from "@/hooks";

const initViewport = {
  latitude: 47.0105,
  longitude: 28.5,
  zoom: 7,
  width: "calc(100vw - 512px)",
};

export const Map = () => {
  const [viewstate, setViewstate] = useState<any>(initViewport);
  const mapRef = useRef<any>(null);

  const { state } = useSharedInputs();
  const { selectedRoute } = state;
  const { paths } = selectedRoute || {
    paths: [],
  };
  const [endpoints, setEndpoints] = useState<any>([]);

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

      setEndpoints([
        {
          longitude: decodedRoute[0][0][0],
          latitude: decodedRoute[0][0][1],
        },
        {
          longitude:
            decodedRoute[decodedRoute.length - 1][
              decodedRoute[decodedRoute.length - 1].length - 1
            ][0],
          latitude:
            decodedRoute[decodedRoute.length - 1][
              decodedRoute[decodedRoute.length - 1].length - 1
            ][1],
        },
      ]);

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
      {endpoints.map((location: any) => (
        <Marker key={location.title} latitude={location.latitude} longitude={location.longitude}>
          <button className="marker-btn">
            <img src="/images/marker.svg" alt="location Marker" width="30" />
          </button>
        </Marker>
      ))}
    </MapGL>
  );
};
