import cn from "classnames";

import { useAppContext } from "@/hooks";
import { Hotel } from "@/types";

interface HotelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  const { name, address, imageUrl } = hotel.details;

  const { selectedHotel, selectHotel } = useAppContext();

  const isSelected = selectedHotel?.details.name === hotel.details.name;

  const handleClick = () => selectHotel(hotel);

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
      </div>
    </div>
  );
};
