const Amadeus = require("amadeus");

export const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
});
