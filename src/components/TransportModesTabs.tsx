import { IoBusSharp, IoTrainSharp, IoAirplaneSharp } from "react-icons/io5";
import { Ticket, TicketMode } from "@/types";
import { useAppContext } from "@/hooks";
import React from "react";

export const TransportModesTabs = () => {
  const { setTicketMode, TicketMode } = useAppContext();

  const handleClick = (mode: TicketMode) => setTicketMode(mode);

  return (
    <div className="tabs tabs-boxed">
      <div className="tab">
        <IoBusSharp />
        <span>Bus</span>
      </div>
      <div className="tab tab-active">
        <IoAirplaneSharp />
        <span>Plane</span>
      </div>
      <div className="tab">
        <IoTrainSharp />
        <span>Train</span>
      </div>
    </div>
  );
};
