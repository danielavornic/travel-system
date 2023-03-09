export interface Hotel {
  lat: number;
  lng: number;
  hotelId: string;
  hotelName: string;
  rating: number;
  reviewScore: number;
  hotelType: number;
  minRate: number;
  cityIds: string[];
  ranking: number;
  details: {
    name: string;
    address: string;
    imageUrl: string;
    tileImageUrl: string;
    hotelUrl: string;
    hotelUrlAlt: string;
    starRating: number;
    numReviews: number;
    reviewScore: number;
    lat: number;
    lng: number;
  };
}
