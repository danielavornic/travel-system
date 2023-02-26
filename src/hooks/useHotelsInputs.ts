import { HotelsContext } from "@/contexts";
import { useContext } from "react";

export const useHotelsInputs = () => useContext(HotelsContext);
