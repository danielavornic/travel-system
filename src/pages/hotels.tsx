import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { hotels as hotelsApi } from "@/api";
import { useSharedInputs } from "@/hooks";
import { Layout, Spinner, HotelForm, HotelCard, HotelsMap } from "@/components";

const initViewport = {
  latitude: 47.0105,
  longitude: 28.5,
  zoom: 7,
  width: "calc(100vw - 512px)",
};

const Hotels = () => {
  const { state, dispatch } = useSharedInputs();
  const { origin, destination, startDate, endDate } = state;
  const [viewstate, setViewstate] = useState<any>(initViewport);

  const { data, isLoading } = useQuery({
    queryKey: ["hotels", destination, startDate, endDate],
    queryFn: () => hotelsApi.getList(destination),
    enabled: !!destination && !!startDate && !!endDate,
    onSuccess: (data) => {
      setViewstate({
        latitude: data.lat,
        longitude: data.lng,
        zoom: 10,
      });
    },
  });

  useEffect(
    () => dispatch({ type: "SELECT_HOTEL", payload: undefined }),
    [destination, startDate, endDate],
  );

  return (
    <Layout title="Hotels" hideFooter>
      <div className="border-t border-gray-200 h-full overflow-y-hidden flex">
        <div className="w-full bg-gray-50 h-full shadow-2xl border-r overflow-x-hidden border-primary overflow-y-auto max-w-xl custom-scrollbar">
          <div className="sticky top-0 z-40 bg-gray-50 p-6 pb-2">
            <h1 className="text-4xl font-bold mb-6">Hotels</h1>
            <HotelForm hideLabel hideButton className="mb-6" isCompact />
          </div>

          {isLoading && origin && destination && (
            <div className="flex justify-center items-center mt-10">
              <Spinner />
            </div>
          )}

          {data?.hotels.length === 0 && !!destination && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-gray-500">
                Please enter your destination and dates to get started
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
            {data?.hotels?.map((hotel: any, index: number) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
        <HotelsMap hotels={data?.hotels} viewstate={viewstate} setViewstate={setViewstate} />
      </div>
    </Layout>
  );
};

export default Hotels;
