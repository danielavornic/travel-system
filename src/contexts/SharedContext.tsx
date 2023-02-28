import { createContext, useReducer } from "react";
import { TicketType } from "@/types";

type SharedState = {
  origin: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  ticketType: TicketType;
};

type SharedAction =
  | { type: "SET_ORIGIN"; payload: string }
  | { type: "SET_DESTINATION"; payload: string }
  | { type: "SET_START_DATE"; payload: Date }
  | { type: "SET_END_DATE"; payload: Date }
  | { type: "SWAP_LOCATIONS" }
  | { type: "SET_TICKET_TYPE"; payload: TicketType };

const initialState: SharedState = {
  origin: "",
  destination: "",
  startDate: undefined,
  endDate: undefined,
  ticketType: TicketType.OneWay,
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
      };
    }
    default: {
      return state;
    }
  }
};

export const SharedProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sharedReducer, initialState);

  return <SharedContext.Provider value={{ state, dispatch }}>{children}</SharedContext.Provider>;
};
