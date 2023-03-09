import { IconBaseProps } from "react-icons";
import {
  IoAirplaneSharp,
  IoBoatSharp,
  IoBusSharp,
  IoCarSharp,
  IoMapSharp,
  IoTrainSharp,
} from "react-icons/io5";

interface VechicleIconProps extends IconBaseProps {
  mode: string;
}

export const VechicleIcon = ({ mode, ...props }: VechicleIconProps) => {
  if (mode === "train") return <IoTrainSharp {...props} />;

  if (mode === "plane") return <IoAirplaneSharp {...props} />;

  if (mode === "bus") return <IoBusSharp {...props} />;

  if (mode === "car") return <IoCarSharp {...props} />;

  if (mode === "ferry") return <IoBoatSharp {...props} />;

  return <IoMapSharp {...props} />;
};
