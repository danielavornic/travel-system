/* eslint-disable no-prototype-builtins */
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

export const getFastesRoute = (data: any) => {
  const fastestRoute = data.reduce((prev: any, curr: any) => {
    const { duration: prevDuration } = prev;
    const { duration: currDuration } = curr;

    return prevDuration < currDuration ? prev : curr;
  }, {});

  return fastestRoute;
};
