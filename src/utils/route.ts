import { encode } from "polyline";
import { Route } from "@/types";

export const extractVehiclesFromName = (name: string): string[] => {
  const vehicles: string[] = [];
  const modesOfTransport: { [key: string]: string } = {
    train: "train",
    eurotunnel: "train",
    fly: "plane",
    bus: "bus",
    ferry: "ferry",
    drive: "car",
    rideshare: "car",
    taxi: "car",
    car: "car",
  };

  const nameArray: string[] = name.toLowerCase().split(",");

  nameArray.forEach((word: string) => {
    Object.keys(modesOfTransport).forEach((mode: string) => {
      if (word.includes(mode)) {
        vehicles.push(modesOfTransport[mode]);
      }
    });
  });

  if (vehicles.length === 0) {
    vehicles.push("other");
  }

  return vehicles;
};

export const getFastestRoute = (data: any) => {
  const fastestRoute = data.reduce((prev: any, curr: any) => {
    const { duration: prevDuration } = prev;
    const { duration: currDuration } = curr;

    return prevDuration < currDuration ? prev : curr;
  }, {});

  return fastestRoute;
};

export const getCheapestRoute = (routes: Route[]) => {
  let cheapestRoute: Route | null = null;
  let smallestInterval = Number.POSITIVE_INFINITY;

  for (const route of routes) {
    const priceLow = route.indicativePrices[0]?.priceLow;
    const priceHigh = route.indicativePrices[0]?.priceHigh;
    const interval = priceHigh - priceLow;

    if (interval < smallestInterval) {
      cheapestRoute = route;
      smallestInterval = interval;
    } else if (interval === smallestInterval) {
      if (
        cheapestRoute?.indicativePrices[0]?.priceLow &&
        priceLow < cheapestRoute?.indicativePrices[0].priceLow
      ) {
        cheapestRoute = route;
      }
    }
  }

  return cheapestRoute;
};

// export const getBestRoute = (data: any) => {
//   let bestRoute: any = null;
//   let bestScore = Number.NEGATIVE_INFINITY;

//   data.forEach((route: any) => {
//     const { duration, indicativePrices } = route;
//     const priceLow = indicativePrices[0]?.priceLow;
//     const priceHigh = indicativePrices[0]?.priceHigh;
//     const interval = priceHigh - priceLow;

//     const score = 1 / duration + 1 / interval;

//     if (score > bestScore) {
//       bestRoute = route;
//       bestScore = score;
//     }

//     if (score === bestScore) {
//       if (duration < bestRoute.duration) {
//         bestRoute = route;
//       }
//     }
//   });

//   return bestRoute;
// };

export const filterFlightRoutes = (data: any) => {
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

  return routes;
};

export const addPathsToRoutes = (routes: Route[], data: any) => {
  routes.forEach((route: any) => {
    if (route.name.includes("Fly")) {
      const c1 = [data.places[0].lat, data.places[0].lng];
      const c2 = [data.places[1].lat, data.places[1].lng];
      route.paths = [encode([c1, c2])];

      return;
    }

    route.segments.forEach((segment: any) => {
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

  return routes;
};

export const processRoutes = (data: any) => {
  let routes = filterFlightRoutes(data);

  const cheapestRoute = getCheapestRoute(routes);
  const fastestRoute = getFastestRoute(routes);
  // const bestRoute = getBestRoute(routes);

  // routes = routes.filter((route: any) => route !== bestRoute);
  routes = routes.filter((route: any) => route !== cheapestRoute);
  routes = routes.filter((route: any) => route !== fastestRoute);

  routes = [cheapestRoute, fastestRoute, ...routes];
  routes = routes.filter((route: any) => route);

  routes.forEach((route: any) => {
    // if (route === bestRoute) {
    //   route.label = "Best";
    // }

    if (route === cheapestRoute) {
      // if (route?.label) {
      //   route.label = "Best & Cheapest";
      // } else {
      route.label = "Cheapest";
      // }
    }

    if (route === fastestRoute) {
      if (route?.label) {
        route.label = "Cheapest & Fastest";
      } else {
        route.label = "Fastest";
      }
    }
  });

  const uniqueNames = new Set<string>();
  routes = routes.filter((route: Route) => {
    if (uniqueNames.has(route.name)) {
      return false;
    } else {
      uniqueNames.add(route.name);
      return true;
    }
  });

  routes = addPathsToRoutes(routes, data);

  return routes;
};
