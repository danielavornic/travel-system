import { geoapify } from "@/lib";

export const cities = {
  autocomplete: async (keyword: string) => {
    const { data } = await geoapify.get("/geocode/autocomplete", {
      params: {
        text: keyword,
        type: "city",
        limit: 5,
      },
    });

    return data.features.map((feature: any) => feature.properties);
  },
};
