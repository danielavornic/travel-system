import axios from "axios";

export const hotels = {
  getList: async (city: string) => {
    const { data } = await axios.get("https://services.rome2rio.com/api/1.5/json/HotelList", {
      params: {
        key: "jGq3Luw3",
        languageCode: "en",
        currencyCode: "USD",
        name: city,
        uid: "MDChi20230222192716401ufgd",
        aqid: "MDChi20230303163750039ufdd",
        zoom: 12,
        radius: 12,
      },
    });

    const sorted = data.hotelList
      .sort((a: any, b: any) => b.reviewScore - a.reviewScore)
      .slice(0, 10);

    for (let i = 0; i < sorted.length; i++) {
      const hotel = sorted[i];
      const details = await hotels.getDetails(hotel.hotelId);
      hotel.details = details;
    }

    return sorted;
  },

  getDetails: async (id: string) => {
    const { data } = await axios.get("https://services.rome2rio.com/api/1.5/json/HotelInfo", {
      params: {
        key: "jGq3Luw3",
        hotelId: id,
        languageCode: "en",
        currencyCode: "EUR",
        provider: "BookingCom",
        uid: "MDChi20230222192716401ufgd",
        aqid: "MDChi20230303163750039ufdd",
        useHotelsRedirect: false,
      },
    });

    return data;
  },
};
