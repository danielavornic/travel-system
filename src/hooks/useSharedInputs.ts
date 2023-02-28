import { useContext } from "react";
import { SharedContext } from "@/contexts";

export const useSharedInputs = () => useContext(SharedContext);
