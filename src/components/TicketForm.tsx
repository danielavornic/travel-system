import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";

import { cities } from "@/api";
import { useAppContext } from "@/hooks";
import { SelectInput, SwapButton } from "@/components";
import { TicketType } from "@/types";
import Link from "next/link";

export const TicketForm = () => {
  const {
    ticketType,
    origin,
    destination,
    startDate,
    endDate,
    setOrigin,
    setDestination,
    setDestinationId,
    setStartDate,
    setEndDate,
    setTicketType,
  } = useAppContext();

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
        .map((city: any) => ({ value: city.city, label: city.formatted })),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetOrigin = (o: string) => setOrigin(o);
  const handleSetDestination = (d: string) => {
    setDestination(d);
    setDestinationId(destinationOptions?.find((option: any) => option.value === d)?.place_id);
  };
  const handleSetStartDate = (date: Date) => setStartDate(date);
  const handleSetEndDate = (date: Date) => setEndDate(date);

  useEffect(() => {
    setOriginInput(origin);
    setDestinationInput(destination);
  }, [origin, destination]);

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full flex-wrap"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <div className="w-full flex mb-2">
          <p
            className={cn("cursor-pointer mr-4", {
              "text-gray-500": ticketType === TicketType.Return,
              underline: ticketType === TicketType.OneWay,
            })}
            onClick={() => setTicketType(TicketType.OneWay)}
          >
            One-way
          </p>
          <p
            className={cn("cursor-pointer", {
              "text-gray-500": ticketType === TicketType.OneWay,
              underline: ticketType === TicketType.Return,
            })}
            onClick={() => setTicketType(TicketType.Return)}
          >
            Return
          </p>
        </div>

        <div className="flex items-end flex-wrap">
          <div className="flex items-end mr-6 flex-[1.8] w-full">
            <div className="form-control w-full">
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
            <div className="form-control w-full">
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
          <div className="flex items-end w-full flex-1 mr-6">
            <div className="form-control mr-2">
              <label className="label">
                <span className="label-text">Departure date</span>
              </label>
              <DatePicker
                className="input input-bordered max-w-[200px]"
                wrapperClassName="w-auto"
                selected={startDate}
                onChange={(date) => handleSetStartDate(date as Date)}
                minDate={new Date()}
                maxDate={endDate}
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Return date</span>
              </label>
              <DatePicker
                className="input input-bordered max-w-[200px]"
                selected={endDate}
                onChange={(date) => handleSetEndDate(date as Date)}
                minDate={startDate}
              />
            </div>
          </div>
          <Link href="/tickets">
            <button className="btn btn-primary mt-4">Search</button>
          </Link>
        </div>
      </div>
    </form>
  );
};
