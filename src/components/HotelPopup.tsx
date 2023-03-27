import { CgClose } from "react-icons/cg";

import { useAppContext } from "@/hooks";
import { Hotel } from "@/types";

export const HotelPopup = ({ hotel }: { hotel: Hotel }) => {
  const { selectHotel } = useAppContext();
  const { details, minRate } = hotel;
  const { name, address, imageUrl, hotelUrl, reviewScore } = details;

  const handleClick = () => selectHotel(undefined);

  return (
    <div className="card bg-white w-full max-w-lg mx-auto block p-4 mt-4 shadow-lg">
      <button
        className="absolute top-4 right-4 btn btn-circle btn-xs bg-gray-200 hover:bg-gray-300 text-gray-500 border-none"
        onClick={() => handleClick()}
      >
        <CgClose />
      </button>
      <div className="flex mr-10">
        <div>
          <div
            className="bg-cover w-28 h-28 bg-center rounded-xl mr-6"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="space-y-2 text-sm mt-4">
            <p>
              <span className="font-bold">Address:</span> {address}
            </p>
            <p>
              <span className="font-bold">Score:</span> {reviewScore}/10
            </p>
          </div>
          <div className="mt-6 flex space-x-4 items-center">
            <a href={hotelUrl} target="_blank" rel="noreferrer">
              <button className="btn btn-sm btn-primary ">View More</button>
            </a>
            <p className="text-primary font-semibold text-lg">{minRate}$ per night</p>
          </div>
        </div>
      </div>
    </div>
  );
};
