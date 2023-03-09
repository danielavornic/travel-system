/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useSharedInputs } from "@/hooks";
import { Hotel } from "@/types";

interface HotelsMapProps extends React.ComponentPropsWithoutRef<"div"> {
  hotels: Hotel[];
  viewstate: any;
  setViewstate: any;
}

export const HotelsMap = ({ hotels, viewstate, setViewstate }: HotelsMapProps) => {
  const mapRef = useRef<any>(null);

  const { state, dispatch } = useSharedInputs();
  const { selectedRoute } = state;

  const handleClick = (hotel: Hotel) => dispatch({ type: "SELECT_HOTEL", payload: hotel });

  return (
    <MapGL
      {...viewstate}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: "calc(100vw - 512px)", height: "100vh" }}
      onMove={(e) => setViewstate(e.viewState)}
    >
      {hotels?.map((location: any) => (
        <Marker key={location.title} latitude={location.lat} longitude={location.lng}>
          <button className="marker-btn" onClick={() => handleClick(location)}>
            <img src="/images/marker.svg" alt="location Marker" width="30" />
          </button>
        </Marker>
      ))}
    </MapGL>
  );
};
