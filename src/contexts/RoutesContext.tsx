import { createContext, useReducer } from "react";

type RoutesState = {
  origin: string;
  destination: string;
};

type RoutesAction =
  | { type: "SET_ORIGIN"; payload: string }
  | { type: "SET_DESTINATION"; payload: string }
  | { type: "REVERSE_LOCATIONS" };

const initialState: RoutesState = {
  origin: "",
  destination: "",
};

export const RoutesContext = createContext<{
  state: RoutesState;
  dispatch: React.Dispatch<RoutesAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const routesReducer = (state: RoutesState, action: RoutesAction) => {
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

export const RoutesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(routesReducer, initialState);

  return <RoutesContext.Provider value={{ state, dispatch }}>{children}</RoutesContext.Provider>;
};
