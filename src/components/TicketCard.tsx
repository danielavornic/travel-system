import cn from "classnames";
import { FiClock } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";

import { useAppContext } from "@/hooks";
import { formatTicketDate, minutesToHours } from "@/utils";

interface TicketCardProps extends React.HTMLAttributes<HTMLDivElement> {
  arrivalDate: string;
  departureDate: string;
  arrivalTime: string;
  departureTime: string;
  carrier?: {
    name: string;
    iconUrl?: string;
  };
  duration: number;
  link: string;
  price: string | number;
  line?: number;
  dayChange?: number;
  marketingCarrier?: number;
  vehicle?: number;
  isTransfer?: boolean;
}

export const TicketCard = ({
  arrivalDate,
  departureDate,
  arrivalTime,
  departureTime,
  carrier,
  duration,
  link,
  price,
  className,
  dayChange,
  ...props
}: TicketCardProps) => {
  const { origin, destination, ticketAdultsNr } = useAppContext();

  return (
    <div
      className={cn(
        "flex justify-between items-center w-full p-4 border bg-white rounded-lg border-gray-200",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col space-y-3 items-center justify-center w-1/6">
        {carrier?.iconUrl && (
          <div
            className="w-10 h-10 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                carrier.iconUrl.startsWith("http") ? carrier.iconUrl : `https:${carrier.iconUrl}`
              })`,
            }}
          />
        )}
        <p className="text-lg font-semibold">{carrier?.name}</p>
      </div>

      <div
        className="space-y-6 w-full h-fll border-x-2 border-dashed px-4 py-2"
        style={{ borderLeftStyle: "solid" }}
      >
        <div className="flex justify-between items-center w-full max-w-[80%] mx-auto">
          <div className="space-y-2 flex-col items-center text-center justify-center">
            <p className="text-lg">{origin}</p>
            <p className="text-2xl font-semibold">{departureTime}</p>
            <p className="text-xl">{formatTicketDate(departureDate)}</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <BsArrowRight className="text-4xl text-primary" />
            <div className="badge badge-lg bg-white border-primary text-primary">
              <FiClock className="mr-2" />
              {minutesToHours(duration)} {dayChange ? `- ${dayChange} change` : ""}
            </div>
          </div>

          <div className="space-y-2 flex-col items-center text-center justify-center">
            <p className="text-lg">{destination}</p>
            <p className="text-2xl font-semibold">{arrivalTime}</p>
            <p className="text-xl">{formatTicketDate(arrivalDate)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center w-1/5">
        <div className="flex flex-col items-center">
          <p className="font-bold text-2xl">${price}</p>
          <div className="flex space-x-1 items-center text-gray-500">
            <p>{ticketAdultsNr}</p>
            <IoPerson className="ml-2" />
          </div>
        </div>
        <a href={link} target="_blank" rel="noreferrer">
          <button className="btn btn-primary btn-sm">Buy ticket</button>
        </a>
      </div>
    </div>
  );
};
