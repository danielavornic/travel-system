import { VscArrowSwap } from "react-icons/vsc";
import { useSharedInputs } from "@/hooks";

export const SwapButton = () => {
  const { dispatch } = useSharedInputs();

  return (
    <button
      className="btn btn-outline bg-white mx-2"
      onClick={() => dispatch({ type: "SWAP_LOCATIONS" })}
    >
      <VscArrowSwap className="text-md" />
    </button>
  );
};
