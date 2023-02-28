import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cities } from "@/api";
import { useSharedInputs } from "@/hooks";
import { SelectInput, SwapButton } from "@/components";

export const RouteForm = () => {
  const { state, dispatch } = useSharedInputs();
  const { origin, destination } = state;

  const [originInput, setOriginInput] = useState(origin);
  const [destinationInput, setDestinationInput] = useState(destination);

  const { data: originOptions } = useQuery({
    queryKey: ["originOptions", originInput],
    queryFn: () => cities.autocomplete(originInput),
    enabled: !!originInput && originInput.length > 1,
    select: (data) =>
      data
        .filter((city: any) => city.name !== destination)
        .map((city: any) => ({ value: city.name, label: city.detailedName })),
  });

  const { data: destinationOptions } = useQuery({
    queryKey: ["destinationOptions", destinationInput],
    queryFn: () => cities.autocomplete(destinationInput),
    enabled: !!destinationInput && destinationInput.length > 1,
    select: (data) =>
      data
        .filter((city: any) => city.name !== origin)
        .map((city: any) => ({ value: city.name, label: city.detailedName })),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetOrigin = (o: string) => dispatch({ type: "SET_ORIGIN", payload: o });
  const handleSetDestination = (d: string) => dispatch({ type: "SET_DESTINATION", payload: d });

  useEffect(() => {
    setOriginInput(origin);
    setDestinationInput(destination);
  }, [origin, destination]);

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full mr-6 flex-wrap">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Origin</span>
          </label>
          <SelectInput
            value={origin}
            options={originOptions || []}
            onChange={handleSetOrigin}
            onInputChange={setOriginInput}
          />
        </div>
        <SwapButton />
        <div className="form-control flex-1 w-full">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <SelectInput
            value={destination}
            options={destinationOptions || []}
            onChange={handleSetDestination}
            onInputChange={setDestinationInput}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4">Search</button>
    </form>
  );
};
