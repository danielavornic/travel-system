import { IndicativePrice } from "@/types";

export const getPriceRange = (indicativePrices: IndicativePrice[]) => {
  if (!indicativePrices?.length) {
    return { minPrice: undefined, maxPrice: undefined };
  }

  const minPrice = Math.min(...indicativePrices.map((price) => price.priceLow));
  const maxPrice = Math.max(...indicativePrices.map((price) => price.priceHigh));

  return { minPrice, maxPrice };
};
