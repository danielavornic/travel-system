import { createContext, useReducer } from "react";
import { TicketType } from "@/types";

type TicketsState = {
  origin: string;
  destination: string;
  ticketType: TicketType;
  departureDate?: Date;
  returnDate?: Date;
};

type TicketsAction =
  | { type: "SET_ORIGIN"; payload: string }
  | { type: "SET_DESTINATION"; payload: string }
  | { type: "SET_TICKET_TYPE"; payload: TicketType }
  | { type: "SET_DEPARTURE_DATE"; payload: Date }
  | { type: "SET_RETURN_DATE"; payload: Date }
  | { type: "REVERSE_LOCATIONS" };

const initialState: TicketsState = {
  origin: "",
  destination: "",
  ticketType: TicketType.OneWay,
  departureDate: undefined,
  returnDate: undefined,
};

export const TicketsContext = createContext<{
  state: TicketsState;
  dispatch: React.Dispatch<TicketsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ticketsReducer = (state: TicketsState, action: TicketsAction) => {
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
    case "SET_TICKET_TYPE": {
      return {
        ...state,
        ticketType: action.payload,
      };
    }
    case "SET_DEPARTURE_DATE": {
      return {
        ...state,
        departureDate: action.payload,
      };
    }
    case "SET_RETURN_DATE": {
      return {
        ...state,
        returnDate: action.payload,
        ticketType: TicketType.Return,
      };
    }
    case "REVERSE_LOCATIONS": {
      return {
        ...state,
        origin: state.destination,
        destination: state.origin,
      };
    }
    default: {
      return state;
    }
  }
};

export const TicketsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ticketsReducer, initialState);

  return <TicketsContext.Provider value={{ state, dispatch }}>{children}</TicketsContext.Provider>;
};
