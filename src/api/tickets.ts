import axios from "axios";
import { convertTime } from "@/utils";

export const tickets = {
  getTickets: async (params: any) => {
    const { data: config } = await axios.get(
      "https://services.rome2rio.com/api/1.5/json/SchedulesConfiguration",
      {
        params: {
          key: "86f5qBa1",
          oName: params.origin,
          dName: params.destination,
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
        },
      },
    );

    const { data } = await axios.get(
      "https://services.rome2rio.com/api/1.5/json/ticketableschedules",
      {
        params: {
          key: "86f5qBa1",
          oName: params.origin,
          dName: params.destination,
          oDateTime: convertTime(params.startDate),
          iDateTime: convertTime(params.endDate),
          mode: params.mode,
          isTimeManuallySet: false,
          currencyCode: "USD",
          paxTypes: params.paxTypes || "paxadult",
          paxAges: params.paxAges || "",
          paxCards: params.paxCards || "",
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
          searchData: config.surfaceData,
        },
      },
    );

    if (!data?.fares) {
      return [];
    }

    const resultsCount = data.fares?.length > 5 ? 5 : data?.fares.length;

    const results = data.hops.slice(0, resultsCount).map((hop: any, index: any) => {
      const fare = data.fares[index];
      const link =
        JSON.parse(fare.fareBookingData)?.deeplink || JSON.parse(fare.fareBookingData)?.link;
      const carrier = data.carriers[hop.marketingCarrier];

      return {
        ...hop,
        price: fare?.price,
        link,
        carrier,
      };
    });

    return results;
  },

  getFlights: async (params: any) => {
    const { data: config } = await axios.get(
      "https://services.rome2rio.com/api/1.5/json/SchedulesConfiguration",
      {
        params: {
          key: "86f5qBa1",
          oName: params.origin,
          dName: params.destination,
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
        },
      },
    );

    const { data: initialData } = await axios.get(
      "https://services.rome2rio.com/api/1.5/json/flightschedules",
      {
        params: {
          key: "86f5qBa1",
          oName: params.origin,
          dName: params.destination,
          oDateTime: convertTime(params.startDate),
          iDateTime: convertTime(params.endDate),
          mode: "plane",
          isTimeManuallySet: false,
          currencyCode: "USD",
          languageCode: "en",
          paxTypes: params.paxTypes || "paxadult",
          paxAges: params.paxAges || "",
          paxCards: params.paxCards || "",
          searchData: config.flightData,
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
        },
      },
    );

    const { pollingInfo } = initialData.header;

    // const { data } = await axios.get("https://services.rome2rio.com/api/1.5/json/flightpolling", {
    //   params: {
    //     key: "86f5qBa1",
    //     data: pollingInfo,
    //     aqid: "MDChi20230303163750039ufdd",
    //     uid: "MDChi20230222192716401ufgd",
    //   },
    // });

    let data: any;
    let retries = 0;
    const maxRetries = 5;

    while (!data && retries < maxRetries) {
      try {
        const response = await axios.get(
          "https://services.rome2rio.com/api/1.5/json/flightpolling",
          {
            params: {
              key: "86f5qBa1",
              data: pollingInfo,
              aqid: "MDChi20230303163750039ufdd",
              uid: "MDChi20230222192716401ufgd",
            },
          },
        );
        if (
          response.data &&
          response.data.header?.errors?.[0] !== "Could not get prices. Please try again."
        ) {
          data = response.data;
        } else {
          retries++;
        }
      } catch (error) {
        console.error(error);
        retries++;
      }
    }

    if (!data?.fares) {
      return [];
    }

    const results = data.hops.slice(0, 5).map((hop: any, index: any) => {
      const fare = data.fares[index];
      const link = JSON.parse(fare.fareBookingData);
      const carrier = data.carriers[hop.marketingCarrier];

      return {
        ...hop,
        price: fare.price,
        link: link?.deeplink || link,
        carrier,
      };
    });

    return results;
  },
};
