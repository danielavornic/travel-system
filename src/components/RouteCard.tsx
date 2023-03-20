import cn from "classnames";
import { IoChevronForwardOutline } from "react-icons/io5";

import { useSharedInputs } from "@/hooks";
import { Route } from "@/types";
import { extractVehiclesFromName, getPriceRange, secondsToHours } from "@/utils";
import { VechicleIcon } from "@/components";

interface RouteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  route: Route;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  const { state, dispatch } = useSharedInputs();
  const { selectedRoute } = state;

  if (!route) return null;

  const { name, duration, indicativePrices, label } = route;
  const isSelected = selectedRoute?.name === route.name;
  const vehicles = extractVehiclesFromName(name);
  const { minPrice, maxPrice } = getPriceRange(indicativePrices);

  const handleClick = () => dispatch({ type: "SELECT_ROUTE", payload: route });

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full relative cursor-pointer py-4 px-6 shadow-md shadow-gray-100 bg-white rounded-lg",
        {
          "border-primary": isSelected,
          "border-gray-200": !isSelected,
        },
      )}
      onClick={handleClick}
    >
      {isSelected && <div className="absolute w-1 h-full bg-green-500 rounded-l-lg top-0 left-0" />}

      <div className="space-y-2">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            {vehicles.map((vehicle, index) => (
              <>
                <VechicleIcon mode={vehicle} key={index} className="text-2xl" />
                {index !== vehicles.length - 1 && (
                  <IoChevronForwardOutline className="text-xl text-gray-400" />
                )}
              </>
            ))}
          </div>
          {label && (
            <div className="badge badge-sm bg-green-200 text-green-600 border border-none uppercase rounded">
              {label}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="text-lg font-bold mr-2">{name}</div>
        </div>
        <div className="flex justify-between">
          <p>{secondsToHours(duration)}</p>
          {indicativePrices.length > 0 && !!minPrice && !!maxPrice && (
            <p className="font-semibold text-primary">{`$${minPrice} - $${maxPrice}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};
