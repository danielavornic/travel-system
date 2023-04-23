import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { cities } from "@/api";
import { useAppContext } from "@/hooks";
import { TicketType } from "@/types";
import { SelectInput, SwapButton } from "@/components";

interface TicketFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onPage?: boolean;
  refetch?: () => void;
}

export const TicketForm = ({ onPage = false, refetch, className, ...props }: TicketFormProps) => {
  const router = useRouter();

  const {
    ticketType,
    origin,
    destination,
    startDate,
    endDate,
    ticketAdultsNr,
    setOrigin,
    setDestination,
    setDestinationId,
    setStartDate,
    setEndDate,
    setTicketType,
    setTicketAdultsNr,
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
      className={cn(
        "flex flex-col md:flex-row items-end md:justify-between w-full flex-wrap",
        className,
      )}
      onSubmit={handleSubmit}
      {...props}
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
          <div
            className={cn("flex items-end mr-6 flex-[1.8] w-full", {
              "flex-[2]": onPage,
            })}
          >
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
            <div
              className={cn("form-control mr-2", {
                "flex-1": onPage,
              })}
            >
              <label className="label">
                <span className="label-text">Departure date</span>
              </label>
              <DatePicker
                className={cn("input input-bordered max-w-[200px]", {
                  "w-full max-w-none": onPage,
                })}
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
                className={cn("input input-bordered max-w-[200px]", {
                  "w-full max-w-none": onPage,
                })}
                selected={endDate}
                onChange={(date) => handleSetEndDate(date as Date)}
                minDate={startDate}
              />
            </div>
          </div>
          {onPage && (
            <div className="form-control mr-4">
              <label className="label">
                <span className="label-text">Nr. adults</span>
              </label>
              <div className="flex border border-gray-300 rounded-lg h-12">
                <input
                  className="input bg-opacity-60 text-center w-16 h-[46px] focus:outline-none cursor-default"
                  type="number"
                  min={1}
                  max={9}
                  value={ticketAdultsNr}
                  readOnly
                />
                <div className="flex flex-col bg-gray-100 rounded-r-[0.4rem]">
                  <button
                    type="button"
                    className="flex-1 px-1 hover:bg-gray-200 rounded-tr-[0.4rem] transition"
                    onClick={() => setTicketAdultsNr(Math.min(ticketAdultsNr + 1, 9))}
                  >
                    <AiOutlinePlus className="text-sm" />
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-1 hover:bg-gray-200 rounded-br-[0.4rem] transition"
                    onClick={() => setTicketAdultsNr(Math.max(ticketAdultsNr - 1, 1))}
                  >
                    <AiOutlineMinus className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              if (onPage) {
                refetch?.();
              } else {
                router.push("/tickets");
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
