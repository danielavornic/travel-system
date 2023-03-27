import { createContext, useEffect, useReducer, useRef } from "react";
import { Hotel, Route, TicketMode, TicketType } from "@/types";
import { shallowEquals } from "@/utils";

type AppState = {
  origin: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  ticketType: TicketType;
  destinationId?: string;
  searchRoutes?: () => void;
  selectedRoute?: Route;
  selectedHotel?: Hotel;
  ticketMode?: TicketMode;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setTicketType: (ticketType: TicketType) => void;
  setDestinationId: (destinationId: string) => void;
  selectRoute: (route: Route | undefined) => void;
  selectHotel: (hotel: Hotel | undefined) => void;
  setTicketMode: (ticketMode: TicketMode | undefined) => void;
  swapLocations: () => void;
};

type AppAction =
  | { type: "SET_ORIGIN"; payload: string }
  | { type: "SET_DESTINATION"; payload: string }
  | { type: "SET_START_DATE"; payload: Date | undefined }
  | { type: "SET_END_DATE"; payload: Date | undefined }
  | { type: "SWAP_LOCATIONS" }
  | { type: "SET_TICKET_TYPE"; payload: TicketType }
  | { type: "SET_DESTINATION_ID"; payload: string }
  | { type: "SELECT_ROUTE"; payload: Route | undefined }
  | { type: "SELECT_HOTEL"; payload: Hotel | undefined }
  | { type: "SET_TICKET_MODE"; payload: TicketMode | undefined };

const initialState: AppState = {
  origin: "",
  destination: "",
  startDate: undefined,
  endDate: undefined,
  ticketType: TicketType.OneWay,
  destinationId: undefined,
  searchRoutes: undefined,
  selectedRoute: undefined,
  selectedHotel: undefined,
  ticketMode: TicketMode.Bus,
  setOrigin: () => null,
  setDestination: () => null,
  setStartDate: () => null,
  setEndDate: () => null,
  setTicketType: () => null,
  setDestinationId: () => null,
  selectRoute: () => null,
  selectHotel: () => null,
  setTicketMode: () => null,
  swapLocations: () => null,
};

export const AppContext = createContext<AppState>(initialState);

const sharedReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "SET_ORIGIN": {
      return {
        ...state,
        origin: action.payload,
      };
    }
    case "SET_DESTINATION": {
      return {
        ...state,
        destination: action.payload,
      };
    }
    case "SET_START_DATE": {
      return {
        ...state,
        startDate: action.payload,
      };
    }
    case "SET_END_DATE": {
      return {
        ...state,
        endDate: action.payload,
        ticketType: TicketType.Return,
        ...(!action.payload ? { ticketType: TicketType.OneWay } : {}),
      };
    }
    case "SET_TICKET_TYPE": {
      return {
        ...state,
        ticketType: action.payload,
      };
    }
    case "SET_TICKET_MODE": {
      return {
        ...state,
        ticketMode: action.payload,
      };
    }
    case "SWAP_LOCATIONS": {
      return {
        ...state,
        origin: state.destination,
        destination: state.origin,
        selectedRoute: undefined,
      };
    }
    case "SET_DESTINATION_ID": {
      return {
        ...state,
        destinationId: action.payload,
      };
    }
    case "SELECT_ROUTE": {
      return {
        ...state,
        selectedRoute: action.payload,
      };
    }
    case "SELECT_HOTEL": {
      return {
        ...state,
        selectedHotel: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sharedReducer, initialState);
  const prevStateRef = useRef(initialState);

  useEffect(() => {
    const { origin, destination, startDate, endDate, ticketType, ticketMode } = JSON.parse(
      localStorage.getItem("state") || "{}",
    );
    const today = new Date();
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (origin) {
      dispatch({ type: "SET_ORIGIN", payload: origin as string });
    }

    if (destination) {
      dispatch({ type: "SET_DESTINATION", payload: destination as string });
    }

    if (startDate) {
      dispatch({ type: "SET_START_DATE", payload: start > today ? start : undefined });
    }

    if (endDate) {
      dispatch({ type: "SET_END_DATE", payload: end > today ? end : undefined });
    }

    if (ticketType) {
      dispatch({ type: "SET_TICKET_TYPE", payload: ticketType as TicketType });
    }

    if (ticketMode) {
      dispatch({ type: "SET_TICKET_MODE", payload: ticketMode as TicketMode });
    }
  }, []);

  useEffect(() => {
    if (!shallowEquals(prevStateRef.current, state)) {
      localStorage.setItem("state", JSON.stringify(state));
      prevStateRef.current = state;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setOrigin: (origin: string) => dispatch({ type: "SET_ORIGIN", payload: origin }),
        setDestination: (destination: string) =>
          dispatch({ type: "SET_DESTINATION", payload: destination }),
        setStartDate: (date: Date) => dispatch({ type: "SET_START_DATE", payload: date }),
        setEndDate: (date: Date) => dispatch({ type: "SET_END_DATE", payload: date }),
        setTicketType: (ticketType: TicketType) =>
          dispatch({ type: "SET_TICKET_TYPE", payload: ticketType }),
        setDestinationId: (destinationId: string) =>
          dispatch({ type: "SET_DESTINATION_ID", payload: destinationId }),
        selectRoute: (route: Route | undefined) =>
          dispatch({ type: "SELECT_ROUTE", payload: route }),
        selectHotel: (hotel: Hotel | undefined) =>
          dispatch({ type: "SELECT_HOTEL", payload: hotel }),
        setTicketMode: (ticketMode: TicketMode | undefined) =>
          dispatch({ type: "SET_TICKET_MODE", payload: ticketMode }),
        swapLocations: () => dispatch({ type: "SWAP_LOCATIONS" }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
