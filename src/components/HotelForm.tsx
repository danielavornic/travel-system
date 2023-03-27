import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";

import { cities } from "@/api";
import { useAppContext } from "@/hooks";
import { SelectInput } from "@/components";
import Link from "next/link";

interface HotelFormProps extends React.HTMLAttributes<HTMLFormElement> {
  hideLabel?: boolean;
  hideButton?: boolean;
  isCompact?: boolean;
}

export const HotelForm = ({
  hideLabel = false,
  hideButton = false,
  isCompact,
  className,
  ...props
}: HotelFormProps) => {
  const {
    origin,
    destination,
    startDate,
    endDate,
    setDestination,
    setDestinationId,
    setOrigin,
    setStartDate,
    setEndDate,
  } = useAppContext();

  const [destinationInput, setDestinationInput] = useState(destination);

  const { data: destinationOptions } = useQuery({
    queryKey: ["destinationOptions", destinationInput],
    queryFn: () => cities.autocomplete(destinationInput),
    enabled: !!destinationInput && destinationInput.length > 1,
    select: (data) => data.map((city: any) => ({ value: city.city, label: city.formatted })),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetDestination = (d: string) => {
    setDestination(d);
    setDestinationId(destinationOptions?.find((option: any) => option.value === d)?.place_id);
    if (d === origin) {
      setOrigin(destination);
    }
  };

  const handleSetStartDate = (date: Date) => setStartDate(date);
  const handleSetEndDate = (date: Date) => setEndDate(date);

  useEffect(() => {
    setDestinationInput(destination);
  }, [destination]);

  return (
    <form
      className={cn("flex flex-col md:flex-row items-end md:justify-between w-full", className)}
      onSubmit={handleSubmit}
    >
      <div className={cn("flex items-end w-full", { "mr-6": !isCompact, "flex-wrap": isCompact })}>
        <div
          className={cn("form-control", {
            "w-full mb-2 flex": isCompact,
            "flex-grow mr-4": !isCompact,
          })}
        >
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
        <div className={cn("form-control mr-2", { "flex-1": isCompact })}>
          {!hideLabel && (
            <label className="label">
              <span className="label-text">Check-in date</span>
            </label>
          )}
          <DatePicker
            className={cn("input input-bordered w-full", { "max-w-[200px]": !isCompact })}
            wrapperClassName="w-auto"
            selected={startDate}
            onChange={(date) => handleSetStartDate(date as Date)}
            minDate={new Date()}
            maxDate={endDate}
            placeholderText="Check-in date"
          />
        </div>
        <div className={cn("form-control", { "flex-1": isCompact })}>
          {!hideLabel && (
            <label className="label">
              <span className="label-text">Check-out date</span>
            </label>
          )}
          <DatePicker
            className={cn("input input-bordered w-full", { "max-w-[200px]": !isCompact })}
            wrapperClassName="w-auto"
            selected={endDate}
            onChange={(date) => handleSetEndDate(date as Date)}
            minDate={startDate}
            placeholderText="Check-out date"
          />
        </div>
      </div>
      {!hideButton && (
        <Link href="/hotels" className="btn btn-primary mt-4">
          Search
        </Link>
      )}
    </form>
  );
};
