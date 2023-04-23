import { IoBusSharp, IoTrainSharp, IoAirplaneSharp } from "react-icons/io5";
import cn from "classnames";

import { TicketMode } from "@/types";
import { useAppContext } from "@/hooks";

interface TransportModesTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TabProps {
  icon: React.FC;
  label: string;
  mode: TicketMode;
  isActive: boolean;
  onClick: (mode: TicketMode) => void;
}

const modes = [
  {
    icon: IoBusSharp,
    label: "Bus",
    mode: TicketMode.Bus,
  },
  {
    icon: IoTrainSharp,
    label: "Train",
    mode: TicketMode.Train,
  },
  {
    icon: IoAirplaneSharp,
    label: "Plane",
    mode: TicketMode.Flight,
  },
];

const Tab = ({ icon: Icon, label, mode, isActive, onClick }: TabProps) => {
  return (
    <div className={cn("tab space-x-2", { "tab-active": isActive })} onClick={() => onClick(mode)}>
      <Icon />
      <span>{label}</span>
    </div>
  );
};

export const TransportModesTabs = ({ className, ...props }: TransportModesTabsProps) => {
  const { setTicketMode, ticketMode } = useAppContext();

  const handleClick = (mode: TicketMode) => setTicketMode(mode);

  return (
    <div className={cn("tabs tabs-boxed w-fit bg-gray-100", className)} {...props}>
      {modes.map(({ icon, label, mode }) => (
        <Tab
          key={mode}
          icon={icon}
          label={label}
          mode={mode}
          isActive={ticketMode === mode}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
