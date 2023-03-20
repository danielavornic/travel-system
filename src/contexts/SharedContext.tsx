import { createContext, useEffect, useReducer, useRef } from "react";
import { Hotel, Route, TicketType } from "@/types";
import { shallowEquals } from "@/utils";

type SharedState = {
  origin: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  ticketType: TicketType;
  destinationId?: string;
  searchRoutes?: () => void;
  selectedRoute?: Route;
  selectedHotel?: Hotel;
};

type SharedAction =
  | { type: "SET_ORIGIN"; payload: string }
  | { type: "SET_DESTINATION"; payload: string }
  | { type: "SET_START_DATE"; payload: Date | undefined }
  | { type: "SET_END_DATE"; payload: Date | undefined }
  | { type: "SWAP_LOCATIONS" }
  | { type: "SET_TICKET_TYPE"; payload: TicketType }
  | { type: "SET_DESTINATION_ID"; payload: string }
  | { type: "SELECT_ROUTE"; payload: Route | undefined }
  | { type: "SELECT_HOTEL"; payload: Hotel | undefined };

const initialState: SharedState = {
  origin: "",
  destination: "",
  startDate: undefined,
  endDate: undefined,
  ticketType: TicketType.OneWay,
  destinationId: undefined,
  searchRoutes: undefined,
  selectedRoute: undefined,
  selectedHotel: undefined,
};

export const SharedContext = createContext<{
  state: SharedState;
  dispatch: React.Dispatch<SharedAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const sharedReducer = (state: SharedState, action: SharedAction) => {
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

export const SharedProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sharedReducer, initialState);
  const prevStateRef = useRef(initialState);

  useEffect(() => {
    const { origin, destination, startDate, endDate, ticketType } = JSON.parse(
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
  }, []);

  useEffect(() => {
    if (!shallowEquals(prevStateRef.current, state)) {
      localStorage.setItem("state", JSON.stringify(state));
      prevStateRef.current = state;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <SharedContext.Provider value={{ state, dispatch }}>{children}</SharedContext.Provider>;
};
