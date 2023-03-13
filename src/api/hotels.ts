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
      .filter((hotel: any) => hotel.minRate > 0 && hotel.reviewScore > 7.5)
      .sort((a: any, b: any) => {
        const minRateA = a.minRate;
        const minRateB = b.minRate;
        const ratioA = a.reviewScore / a.details?.numReviews;
        const ratioB = b.reviewScore / b.details?.numReviews;

        if (minRateA !== minRateB) {
          return minRateA - minRateB;
        } else {
          return ratioB - ratioA;
        }
      })
      .slice(0, 16);

    for (let i = 0; i < sorted.length; i++) {
      const hotel = sorted[i];
      const details = await hotels.getDetails(hotel.hotelId);
      hotel.details = details;
    }

    return {
      lat: data.lat,
      lng: data.lng,
      hotels: sorted,
    };
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
