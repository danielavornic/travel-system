import cn from "classnames";

import { useSharedInputs } from "@/hooks";
import { Hotel } from "@/types";

interface HotelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  const { name, address, imageUrl, hotelUrl } = hotel.details;

  const { state, dispatch } = useSharedInputs();
  const { selectedHotel } = state;

  const isSelected = selectedHotel?.details.name === hotel.details.name;

  const handleClick = () => dispatch({ type: "SELECT_HOTEL", payload: hotel });

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full relative cursor-pointer p-4 border bg-white rounded-lg",
        {
          "border-primary": isSelected,
          "border-gray-200": !isSelected,
        },
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className="w-full bg-cover bg-center h-[140px] rounded-md"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          <h4 className="text-lg font-bold mt-4 mb-2">{name}</h4>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
        <div className="mt-6">
          <a href={hotelUrl} target="_blank" rel="noreferrer">
            <button className="btn btn-sm btn-primary ">View More</button>
          </a>
        </div>
      </div>
    </div>
  );
};