import Link from "next/link";
import { useRouter } from "next/router";
import { GrPowerCycle } from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";

import { TicketType } from "@/types";
import { useHotelsInputs, useRoutesInputs, useTicketsInputs } from "@/hooks";
import { Layout } from "@/components";
import { useCallback } from "react";

enum Tabs {
  Routes = "routes",
  Tickets = "tickets",
  Hotels = "hotels",
}

const tabs = [
  {
    name: "Routes",
    tab: Tabs.Routes,
  },
  {
    name: "Tickets",
    tab: Tabs.Tickets,
  },
  {
    name: "Hotels",
    tab: Tabs.Hotels,
  },
];

const TabItem = ({ tab, name, activeTab }: { tab: Tabs; name: string; activeTab: Tabs }) => {
  const isActive = activeTab === tab;

  return (
    <Link href={{ pathname: "/", query: { tab } }}>
      <span
        className={cn("badge badge-lg", {
          "bg-primary border-primary": isActive,
          "bg-gray-500 border-gray-500": !isActive,
          "mr-4": tab !== Tabs.Hotels,
        })}
      >
        {name}
      </span>
    </Link>
  );
};

const RouteForm = () => {
  const { state, dispatch } = useRoutesInputs();
  const { origin, destination } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetOrigin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_ORIGIN", payload: event.target.value }),
    [dispatch],
  );

  const handleSetDestination = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_DESTINATION", payload: event.target.value }),
    [dispatch],
  );

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end w-full mr-6 flex-wrap">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Origin</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={origin}
            onChange={(e) => handleSetOrigin(e)}
          />
        </div>
        <button
          className="btn btn-outline bg-white mx-2 hover:bg-gray-100"
          onClick={() => dispatch({ type: "REVERSE_LOCATIONS" })}
        >
          <GrPowerCycle className="text-md " />
        </button>
        <div className="form-control flex-1 w-full">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={destination}
            onChange={(e) => handleSetDestination(e)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4">Search</button>
    </form>
  );
};

const TicketForm = () => {
  const { state, dispatch } = useTicketsInputs();
  const { ticketType, origin, destination, departureDate, returnDate } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetOrigin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_ORIGIN", payload: event.target.value }),
    [dispatch],
  );

  const handleSetDestination = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_DESTINATION", payload: event.target.value }),
    [dispatch],
  );

  const handleSetDepartureDate = useCallback(
    (date: Date) => dispatch({ type: "SET_DEPARTURE_DATE", payload: date }),
    [dispatch],
  );

  const handleSetReturnDate = useCallback(
    (date: Date) => dispatch({ type: "SET_RETURN_DATE", payload: date }),
    [dispatch],
  );

  return (
    <form
      className="flex flex-col md:flex-row items-end md:justify-between w-full flex-wrap"
      onSubmit={handleSubmit}
    >
      <div className="w-full mr-4">
        <div className="w-full flex mb-2">
          <p
            className={cn("cursor-pointer mr-4", {
              "text-gray-500": ticketType === TicketType.Return,
              underline: ticketType === TicketType.OneWay,
            })}
            onClick={() => dispatch({ type: "SET_TICKET_TYPE", payload: TicketType.OneWay })}
          >
            One-way
          </p>
          <p
            className={cn("cursor-pointer", {
              "text-gray-500": state.ticketType === TicketType.OneWay,
              underline: ticketType === TicketType.Return,
            })}
            onClick={() => dispatch({ type: "SET_TICKET_TYPE", payload: TicketType.Return })}
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
              <input
                type="text"
                className="input input-bordered"
                value={origin}
                onChange={(e) => handleSetOrigin(e)}
              />
            </div>
            <button
              className="btn btn-outline bg-white mx-2 hover:bg-gray-100"
              onClick={() => dispatch({ type: "REVERSE_LOCATIONS" })}
            >
              <GrPowerCycle className="text-md " />
            </button>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Destination</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={destination}
                onChange={(e) => handleSetDestination(e)}
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
                selected={departureDate}
                onChange={(date) => handleSetDepartureDate(date as Date)}
                minDate={new Date()}
                maxDate={returnDate}
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Return date</span>
              </label>
              <DatePicker
                className="input input-bordered max-w-[200px]"
                selected={returnDate}
                onChange={(date) => handleSetReturnDate(date as Date)}
                minDate={departureDate}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-4">Search</button>
        </div>
      </div>
    </form>
  );
};

const HotelForm = () => {
  const { state, dispatch } = useHotelsInputs();
  const { location, checkIn, checkOut } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSetLocation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_LOCATION", payload: event.target.value }),
    [dispatch],
  );

  const handleSetCheckIn = useCallback(
    (date: Date) => dispatch({ type: "SET_CHECK_IN", payload: date }),
    [dispatch],
  );

  const handleSetCheckOut = useCallback(
    (date: Date) => dispatch({ type: "SET_CHECK_OUT", payload: date }),
    [dispatch],
  );

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
          <input
            type="text"
            className="input input-bordered"
            value={location}
            onChange={(e) => handleSetLocation(e)}
          />
        </div>
        <div className="form-control mr-2">
          <label className="label">
            <span className="label-text">Check-in date</span>
          </label>
          <DatePicker
            className="input input-bordered max-w-[200px]"
            wrapperClassName="w-auto"
            selected={checkIn}
            onChange={(date) => handleSetCheckIn(date as Date)}
            minDate={new Date()}
            maxDate={checkOut}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Check-out date</span>
          </label>
          <DatePicker
            className="input input-bordered max-w-[200px]"
            wrapperClassName="w-auto"
            selected={checkOut}
            onChange={(date) => handleSetCheckOut(date as Date)}
            minDate={checkIn}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4">Search</button>
    </form>
  );
};

export default function Home() {
  const router = useRouter();
  const tab = router.query?.tab || Tabs.Routes;

  return (
    <Layout>
      <div className="flex flex-col items-center h-full pt-28">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold mb-6">TopTrip</h1>
          <p className="text-xl max-w-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a iure placeat officiis
            vitae!
          </p>
        </div>
        <div className="max-w-screen-xl w-full bg-gray-300 p-4 rounded-lg mt-8">
          <div className="flex items-center">
            {tabs.map((item, index) => (
              <TabItem key={index} {...item} activeTab={tab as Tabs} />
            ))}
          </div>
          <div className="mt-6">
            {tab === Tabs.Routes && <RouteForm />}
            {tab === Tabs.Tickets && <TicketForm />}
            {tab === Tabs.Hotels && <HotelForm />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
