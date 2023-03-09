import axios from "axios";

export const routes = {
  get: async (origin: string, destination: string) => {
    const { data } = await axios.get(`https://services.rome2rio.com/api/1.5/json/search`, {
      params: {
        key: "jGq3Luw3",
        oName: origin,
        dName: destination,
        languageCode: "en",
        currencyCode: "USD",
        uid: "MDChi20230222192716401ufgd",
        aqid: "MDChi20230303090706882ufdd",
        groupOperators: true,
      },
    });

    return data;
  },
};
