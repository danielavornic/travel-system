import { minutesToHours } from "@/utils";
import cn from "classnames";
import { FiArrowRight, FiClock } from "react-icons/fi";

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
  return (
    <div
      className={cn(
        "flex justify-between items-end w-full p-4 border bg-white rounded-lg border-gray-200",
        className,
      )}
    >
      <div className="space-y-4">
        <div className="flex space-x-4 items-center">
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
          <div className="flex space-x-2 items-center">
            <p className="text-xl font-semibold">{departureTime}</p>
            <FiArrowRight className="text-gray-500" />
            <p className="text-xl font-semibold">{arrivalTime}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-bold">From:</span> {departureDate}
          </p>
          <p>
            <span className="font-bold">To:</span> {arrivalDate}
          </p>
          {carrier && carrier.name && (
            <p>
              <span className="font-bold">Carrier:</span> {carrier?.name}
            </p>
          )}
        </div>
        <div className="badge badge-lg bg-white border-gray-500 text-gray-500">
          <FiClock className="mr-2" />
          {minutesToHours(duration)} {dayChange ? `- ${dayChange} change` : ""}
        </div>
      </div>
      <div className="flex flex-col space-y-4 items-end">
        <p className="font-bold text-2xl text-primary">{price}$</p>
        <a href={link} target="_blank" rel="noreferrer">
          <button className="btn btn-primary btn-sm">Buy ticket</button>
        </a>
      </div>
    </div>
  );
};
