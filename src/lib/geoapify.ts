import axios from "axios";

export const geoapify = axios.create({
  baseURL: "https://api.geoapify.com/v1",
  params: {
    apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
  },
});

export const geoapify2 = axios.create({
  baseURL: "https://api.geoapify.com/v2",
  params: {
    apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
  },
});
