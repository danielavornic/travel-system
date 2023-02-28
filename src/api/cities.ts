import { amadeus } from "@/lib";

export const cities = {
  autocomplete: async (keyword: string) => {
    const { data } = await amadeus.referenceData.locations.get({
      keyword,
      subType: "CITY",
    });
    return data;
  },
};
