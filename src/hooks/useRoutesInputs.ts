import { useContext } from "react";
import { RoutesContext } from "@/contexts";

export const useRoutesInputs = () => useContext(RoutesContext);
