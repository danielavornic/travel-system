import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { encode } from "polyline";

import { Route } from "@/types";
import { routes as routesApi } from "@/api";
import { useSharedInputs } from "@/hooks";
import { getFastesRoute } from "@/utils";
import { Layout, RouteForm, RouteCard, Spinner, Map } from "@/components";

const labels = ["best", "cheapest", "fastest"];

const Routes = () => {
  const { state, dispatch } = useSharedInputs();
  const { origin, destination } = state;
  const [fastest, setFastest] = useState<Route | null>(null);
  const [sortedRoutes, setSortedRoutes] = useState<Route[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["routes", origin, destination],
    queryFn: () => routesApi.get(origin, destination),
    enabled: !!origin && !!destination,
  });

  useEffect(() => {
    if (!data || !data.routes) return;

    let routes = data.routes.filter(
      (route: any) =>
        !route.name.toLowerCase().includes("rideshare") &&
        !(route.name.toLowerCase().includes("fly") && route.name.toLowerCase().includes("train")),
    );

    routes = routes.filter((route: any) => route);

    const flyRoutes = routes.filter((route: any) => route.name.includes("Fly"));

    if (flyRoutes.length > 1) {
      routes = routes.filter((route: any) => !route.name.includes("Fly"));
      routes.push(flyRoutes[0]);
    }

    setFastest(getFastesRoute(routes));

    routes.forEach((route: any) => {
      if (route.name.includes("Fly")) {
        const c1 = [data.places[0].lat, data.places[0].lng];
        const c2 = [data.places[1].lat, data.places[1].lng];
        route.paths = [encode([c1, c2])];

        return;
      }

      const segments = route.segments;

      segments.forEach((segment: any) => {
        const segmentData = data.segments[segment];
        [segmentData.options[0]].forEach((option: any) => {
          const optionData = data.options[option];
          optionData.hops.forEach((hop: any) => {
            const hopData = data.paths[hop];
            if (!route.paths) route.paths = [];
            if (hopData && !route.paths.includes(hopData)) {
              route.paths.push(hopData);
            }
          });
        });
      });
    });

    setSortedRoutes(routes);
  }, [data, fastest]);

  useEffect(() => {
    setSortedRoutes([]);
    dispatch({ type: "SELECT_ROUTE", payload: undefined });
  }, [origin, destination]);

  return (
    <Layout title="Routes" hideFooter>
      <div className="border-t border-gray-200 h-full overflow-y-hidden flex">
        <div className="w-full bg-gray-50 h-full shadow-2xl border-r border-primary overflow-y-auto max-w-lg custom-scrollbar">
          <div className="sticky top-0 z-40 bg-gray-50 p-6 pb-2">
            <h1 className="text-4xl font-bold mb-6">Routes</h1>
            <RouteForm hideLabel hideButton className="mb-6" />
          </div>

          {isLoading && origin && destination && (
            <div className="flex justify-center items-center mt-10">
              <Spinner />
            </div>
          )}

          {sortedRoutes?.length === 0 && !origin && !destination && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-gray-500">
                Please enter your origin and destination to get started
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-4 p-6 pt-0">
            {sortedRoutes?.map((route: any, index: number) => (
              <RouteCard
                key={index}
                route={route}
                label={index < 2 ? labels[index] : route.name === fastest?.name ? "fastest" : ""}
              />
            ))}
          </div>
        </div>
        <Map />
      </div>
    </Layout>
  );
};

export default Routes;
