import { amadeus } from "@/lib";
import { formatDate } from "@/utils";
import axios from "axios";

export const tickets = {
  getTickets: async (params: any) => {
    const { data } = await axios.get(
      "https://services.rome2rio.com/api/1.5/json/ticketableschedules",
      {
        params: {
          key: "86f5qBa1",
          oName: params.origin,
          dName: params.destination,
          oDateTime: params.startDate,
          iDateTime: params.endDate,
          mode: params.mode,
          isTimeManuallySet: false,
          currencyCode: "USD",
          languageCode: "en",
          paxTypes: params.paxTypes || "paxadult",
          paxAges: "",
          paxCards: "",
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
          searchData:
            "H4sIAAAAAAAEAH2T227iMBCGX8XytUE-Hy6BUhYJQUXaFbsRQgaixtuQVEnQlkfa59gXWzsp2kBLo1w4jn_PN__MxESgOI7hY2qzUwURnHwfwjWK4ebx22D2I_I7m_etGD7Y0lVgXpR7v13VtnZFDhHXfa0J00Yi2meCK4oJRTDape41LTIwcOVrUdZdifAHsWYMC8T7SlJujCYh6uBQ1Um5twcEovYw-Hl0-2stM1TQoNWKE_9o1FUuixeXX0ukUUyoIDGUU6zUOsSbFTubNfnWpW1Fx-1ve4LrJuH7zL0Nj1VryP1suho-RR0rrl1gghEjggsaC6IN6WCBKCvCyv16uUbTRgl_1qMxzY0iskE7x0YdyG1gaeIPM7v175lt8TS9RAM9MEzK3QlEicuTj6BSezMaUCKJL0MHdOTqExgluf_0t3yJTbl6x-ZEiwZ7cXDF-HgbvKVbjpf-__8kEBwVeZ68vYXbm4weBstptGnPndPzq9FiPh-vVtPFvE12YssE7I-fNyX1DUaappTSMBHK8fdPWYRuBKO7CSAXCtPH2ChDmVcISTihTUue7VwWrqq8Makts6QCdwmY2GOWJZ_1d7iLYG24DncJbXzHqq7H3tcwHl9Nh_Ad1EwH4ZwRHlDOI4VuqgyjkrYqjC9jIjDObL6vnku7Sz8opREEN8VUSiil9I3xyN1zWrcVa2u6RpBI1qPYm80x7xFvoFA97d0nSsD1P0GC6PVhBAAA",
        },
      },
    );

    const results = data.hops.slice(0, 5).map((hop: any, index: any) => {
      const fare = data.fares[index];
      const link = JSON.parse(fare.fareBookingData);
      const carrier = data.carriers[hop.marketingCarrier];

      return {
        ...hop,
        price: fare.price,
        link,
        carrier,
      };
    });

    return results;
  },

  // getFlights: async (params: any) => {
  //   // schedule config data
  //   const { data: config } = await axios.get(
  //     "https://services.rome2rio.com/api/1.5/json/SchedulesConfiguration",
  //     {
  //       params: {
  //         key: "86f5qBa1",
  //         oName: params.origin,
  //         dName: params.destination,
  //         uid: "MDChi20230222192716401ufgd",
  //         aqid: "MDChi20230303163750039ufdd",
  //       },
  //     },
  //   );

  //   const { data: initialData } = await axios.get(
  //     "https://services.rome2rio.com/api/1.5/json/flightschedules",
  //     {
  //       params: {
  //         key: "86f5qBa1",
  //         oName: params.origin,
  //         dName: params.destination,
  //         oDateTime: params.startDate,
  //         iDateTime: params.endDate,
  //         mode: "plane",
  //         isTimeManuallySet: false,
  //         currencyCode: "USD",
  //         languageCode: "en",
  //         paxTypes: params.paxTypes || "paxadult",
  //         paxAges: "",
  //         paxCards: "",
  //         searchData: config.flightData,
  //         uid: "MDChi20230222192716401ufgd",
  //         aqid: "MDChi20230303163750039ufdd",
  //       },
  //     },
  //   );

  //   const { pollingInfo } = initialData.header;

  //   const { data } = await axios.get("https://services.rome2rio.com/api/1.5/json/flightpolling", {
  //     params: {
  //       key: "86f5qBa1",
  //       data: pollingInfo,
  //       aqid: "MDChi20230303163750039ufdd",
  //       uid: "MDChi20230222192716401ufgd",
  //     },
  //   });

  //   const results = data.hops.slice(0, 5).map((hop: any, index: any) => {
  //     const fare = data.fares[index];
  //     const link = JSON.parse(fare.fareBookingData);
  //     const carrier = data.carriers[hop.marketingCarrier];

  //     return {
  //       ...hop,
  //       price: fare.price,
  //       link,
  //       carrier,
  //     };
  //   });

  //   console.log(results);

  //   return results;
  // },

  getFlights: async (params: any) => {
    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: params.origin,
        destinationLocationCode: params.destination,
        departureDate: formatDate(params.startDate),
        adults: 1,
        currencyCode: "USD",
        max: 5,
      })
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((response: any) => {
        console.error(response);
      });
  },
};
