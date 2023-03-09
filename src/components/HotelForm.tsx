import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cities, hotels } from "@/api";
import { useSharedInputs } from "@/hooks";
import { SelectInput } from "@/components";

export const HotelForm = () => {
  const { state, dispatch } = useSharedInputs();
  const { destination, startDate, endDate } = state;

  const [destinationInput, setDestinationInput] = useState(destination);

  const { data: destinationOptions } = useQuery({
    queryKey: ["destinationOptions", destinationInput],
    queryFn: () => cities.autocomplete(destinationInput),
    enabled: !!destinationInput && destinationInput.length > 1,
    select: (data) => data.map((city: any) => ({ value: city.city, label: city.formatted })),
  });

  const { data: hotelsList } = useQuery({
    queryKey: ["hotels", state.destinationId, state.startDate, state.endDate],
    queryFn: () => hotels.getList(state.destination),
    enabled: !!state.destination && !!state.startDate && !!state.endDate,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetDestination = (d: string) => {
    dispatch({ type: "SET_DESTINATION", payload: d });
    dispatch({
      type: "SET_DESTINATION_ID",
      payload: destinationOptions?.find((option: any) => option.value === d)?.place_id,
    });
    if (d === state.origin) {
      dispatch({ type: "SET_ORIGIN", payload: state.destination });
    }
  };

  const handleSetStartDate = (date: Date) => dispatch({ type: "SET_START_DATE", payload: date });
  const handleSetEndDate = (date: Date) => dispatch({ type: "SET_END_DATE", payload: date });

  useEffect(() => {
    setDestinationInput(destination);
  }, [destination]);

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full mr-6">
        <div className="form-control flex-grow mr-4">
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
        <div className="form-control mr-2">
          <label className="label">
            <span className="label-text">Check-in date</span>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Check-out date</span>
          </label>
          <DatePicker
            className="input input-bordered max-w-[200px]"
            wrapperClassName="w-auto"
            selected={endDate}
            onChange={(date) => handleSetEndDate(date as Date)}
            minDate={startDate}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4">Search</button>
    </form>
  );
};
