import { useQuery } from "@tanstack/react-query";

import { TicketMode } from "@/types";
import { tickets as ticketsApi } from "@/api";
import { useAppContext } from "@/hooks";
import { removeDiactrics } from "@/utils";
import { Layout, Spinner, TicketCard, TicketForm } from "@/components";

const airports = require("@nitro-land/airport-codes");

const Tickets = () => {
  const { origin, destination, startDate, endDate, ticketMode } = useAppContext();

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", origin, destination, startDate, endDate],
    queryFn: () => {
      const origin2 =
        ticketMode === TicketMode.Flight
          ? airports.findWhere({ city: removeDiactrics(origin) }).get("iata")
          : origin;
      const destination2 =
        ticketMode === TicketMode.Flight
          ? airports.findWhere({ city: removeDiactrics(destination) }).get("iata")
          : destination;

      if (ticketMode === TicketMode.Flight) {
        return ticketsApi.getFlights({
          origin: origin2,
          destination: destination2,
          startDate,
          endDate,
          mode: ticketMode,
        });
      }

      return ticketsApi.getTickets({
        origin: origin2,
        destination: destination2,
        startDate,
        endDate,
        mode: ticketMode,
      });
    },
    enabled: !!origin && !!destination && !!startDate,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <Layout title="Tickets" hideFooter>
      <div className="container mx-auto justify-between m-10 pb-12">
        <h1 className="text-4xl font-bold mb-8">Tickets</h1>
        <TicketForm onPage />

        {isLoading && (
          <div className="flex justify-center items-center mt-16">
            <Spinner />
          </div>
        )}

        {data && (
          <div className="w-full mt-12 space-y-6">
            {data.map((ticket: any, idx: number) => (
              <TicketCard key={idx} {...ticket} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tickets;
