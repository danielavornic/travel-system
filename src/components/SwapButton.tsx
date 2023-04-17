import { VscArrowSwap } from "react-icons/vsc";
import { useAppContext } from "@/hooks";

export const SwapButton = () => {
  const { swapLocations } = useAppContext();

  return (
    <button
      className="btn btn-outline bg-white mx-2 border-gray-300 hover:bg-gray-300 hover:text-gray-600 hover:border-gray-300"
      onClick={() => swapLocations()}
    >
      <VscArrowSwap className="text-md" />
    </button>
  );
};
