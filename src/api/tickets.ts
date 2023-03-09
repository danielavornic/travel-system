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
          oDateTime: params.departureDate,
          iDateTime: params.returnDate,
          mode: params.mode,
          isTimeManuallySet: false,
          currencyCode: "USD",
          languageCode: "en",
          paxTypes: params.paxTypes || "paxadult",
          paxAges: "",
          paxCards: "",
          uid: "MDChi20230222192716401ufgd",
          aqid: "MDChi20230303163750039ufdd",
        },
      },
    );

    return data;
  },

  getFlights: async (params: any) => {
    const { data } = await axios.get("https://services.rome2rio.com/api/1.5/json/flightschedules", {
      params: {
        key: "86f5qBa1",
        oName: params.origin,
        dName: params.destination,
        oDateTime: params.departureDate,
        iDateTime: params.returnDate,
        mode: "plane",
        isTimeManuallySet: false,
        currencyCode: "USD",
        languageCode: "en",
        paxTypes: params.paxTypes || "paxadult",
        paxAges: "",
        paxCards: "",
        uid: "MDChi20230222192716401ufgd",
        aqid: "MDChi20230303163750039ufdd",
      },
    });

    return data;
  },
};
