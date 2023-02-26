import { useContext } from "react";
import { TicketsContext } from "@/contexts";

export const useTicketsInputs = () => useContext(TicketsContext);
