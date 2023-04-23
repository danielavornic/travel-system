import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Route } from "@/types";
import { routes as routesApi } from "@/api";
import { useAppContext } from "@/hooks";
import { processRoutes } from "@/utils";
import { Layout, RouteForm, RouteCard, Spinner, RoutesMap } from "@/components";

const Routes = () => {
  const { origin, destination, selectRoute } = useAppContext();
  const [sortedRoutes, setSortedRoutes] = useState<Route[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["routes", origin, destination],
    queryFn: () => routesApi.get(origin, destination),
    enabled: !!origin && !!destination,
  });

  useEffect(() => {
    if (!data || !data.routes) return;
    const routes = processRoutes(data);
    setSortedRoutes(routes);
    selectRoute(routes[0]);
  }, [data]);

  useEffect(() => {
    setSortedRoutes([]);
    selectRoute(undefined);
  }, [origin, destination]);

  return (
    <Layout title="Routes" hideFooter>
      <div className="border-t border-gray-200 h-full overflow-y-hidden flex">
        <div className="w-full bg-gray-50 h-full shadow-2xl border-r border-primary overflow-y-auto max-w-xl custom-scrollbar">
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
              <RouteCard key={index} route={route} />
            ))}
          </div>
        </div>
        <RoutesMap isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Routes;
