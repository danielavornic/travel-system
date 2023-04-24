import { useQuery, useQueryClient } from "@tanstack/react-query";

import { TicketMode } from "@/types";
import { tickets as ticketsApi } from "@/api";
import { useAppContext } from "@/hooks";
import { generatePaxAgesStr, generatePaxStr, removeDiactrics } from "@/utils";
import { Layout, Spinner, TicketCard, TicketForm, TransportModesTabs } from "@/components";

const airports = require("@nitro-land/airport-codes");

const Tickets = () => {
  const queryClient = useQueryClient();
  const { origin, destination, startDate, endDate, ticketMode, ticketAdultsNr } = useAppContext();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["tickets", origin, destination, startDate, endDate, ticketAdultsNr, ticketMode],
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
          paxTypes: generatePaxStr(ticketAdultsNr),
          paxAges: generatePaxAgesStr(ticketAdultsNr),
          paxCards: generatePaxAgesStr(ticketAdultsNr),
        });
      }

      return ticketsApi.getTickets({
        origin: origin2,
        destination: destination2,
        startDate,
        endDate,
        mode: ticketMode,
        paxTypes: generatePaxStr(ticketAdultsNr),
        paxAges: generatePaxAgesStr(ticketAdultsNr),
        paxCards: generatePaxAgesStr(ticketAdultsNr),
      });
    },
    enabled: !!origin && !!destination && !!startDate && !!ticketAdultsNr,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Layout title="Tickets" hideFooter>
      <div className="container mx-auto justify-between m-10 pb-12">
        <h1 className="text-4xl font-bold mb-8">Tickets</h1>
        <TicketForm
          onPage
          refetch={() => {
            queryClient.invalidateQueries(["tickets"]);
            refetch();
          }}
        />

        <TransportModesTabs className="mt-4" />

        {isFetching && (
          <div className="flex justify-center items-center mt-16">
            <Spinner />
          </div>
        )}

        {data && (
          <div className="w-full mt-12 space-y-6">
            {data.length === 0 && !isFetching ? (
              <div className="mt-16 space-y-2">
                <p className="text-2xl font-bold">No tickets found</p>
                <p className="text-lg">
                  Sorry! We were not able to find any tickets that matched your search. Please try
                  again or use a different search.
                </p>
                <span
                  className="text-lg text-primary underline cursor-pointer"
                  onClick={() => {
                    queryClient.invalidateQueries(["tickets"]);
                    refetch();
                  }}
                >
                  Retry.
                </span>
              </div>
            ) : !isFetching ? (
              <>
                {data.map((ticket: any, idx: number) => (
                  <TicketCard key={idx} {...ticket} />
                ))}
              </>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tickets;
