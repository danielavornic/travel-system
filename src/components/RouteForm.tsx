import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cities } from "@/api";
import { useSharedInputs } from "@/hooks";
import { SelectInput, SwapButton } from "@/components";

interface RouteFormProps extends React.HTMLAttributes<HTMLFormElement> {
  hideLabel?: boolean;
  hideButton?: boolean;
}

export const RouteForm = ({ hideLabel = false, hideButton = false, ...props }: RouteFormProps) => {
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
        .map((city: any) => ({ value: city.city, label: city.formatted })),
  });

  const { data: destinationOptions } = useQuery({
    queryKey: ["destinationOptions", destinationInput],
    queryFn: () => cities.autocomplete(destinationInput),
    enabled: !!destinationInput && destinationInput.length > 1,
    select: (data) =>
      data
        .filter((city: any) => city.name !== origin)
        .map((city: any) => ({ value: city.city, label: city.formatted, place_id: city.place_id })),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetOrigin = (o: string) => dispatch({ type: "SET_ORIGIN", payload: o });
  const handleSetDestination = (d: string) => {
    dispatch({ type: "SET_DESTINATION", payload: d });
    dispatch({
      type: "SET_DESTINATION_ID",
      payload: destinationOptions?.find((option: any) => option.value === d)?.place_id,
    });
  };

  useEffect(() => {
    setOriginInput(origin);
    setDestinationInput(destination);
  }, [origin, destination]);

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex items-end w-full mr-6 flex-wrap">
        <div className="form-control flex-1">
          {!hideLabel && (
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
          )}
          <SelectInput
            value={origin}
            options={originOptions || []}
            onChange={handleSetOrigin}
            onInputChange={setOriginInput}
          />
        </div>
        <SwapButton />
        <div className="form-control flex-1 w-full">
          {!hideLabel && (
            <label className="label">
              <span className="label-text">Destination</span>
            </label>
          )}
          <SelectInput
            value={destination}
            options={destinationOptions || []}
            onChange={handleSetDestination}
            onInputChange={setDestinationInput}
          />
        </div>
      </div>
      {!hideButton && (
        <Link href="/routes" className="btn btn-primary mt-4">
          Search
        </Link>
      )}
    </form>
  );
};
