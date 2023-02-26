import { createContext, useReducer } from "react";

type HotelsState = {
  location: string;
  checkIn?: Date;
  checkOut?: Date;
};

type HotelsAction =
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_CHECK_IN"; payload: Date }
  | { type: "SET_CHECK_OUT"; payload: Date };

const initialState: HotelsState = {
  location: "",
  checkIn: undefined,
  checkOut: undefined,
};

export const HotelsContext = createContext<{
  state: HotelsState;
  dispatch: React.Dispatch<HotelsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const hotelsReducer = (state: HotelsState, action: HotelsAction) => {
  switch (action.type) {
    case "SET_LOCATION": {
      return {
        ...state,
        location: action.payload,
      };
    }
    case "SET_CHECK_IN": {
      return {
        ...state,
        checkIn: action.payload,
      };
    }
    case "SET_CHECK_OUT": {
      return {
        ...state,
        checkOut: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const HotelsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(hotelsReducer, initialState);

  return <HotelsContext.Provider value={{ state, dispatch }}>{children}</HotelsContext.Provider>;
};
