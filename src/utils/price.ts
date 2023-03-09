import { IndicativePrice } from "@/types";

export const getPriceRange = (indicativePrices: IndicativePrice[]) => {
  if (!indicativePrices?.length) {
    return { minPrice: undefined, maxPrice: undefined };
  }

  const minPrice = Math.min(...indicativePrices.map((price) => price.priceLow));
  const maxPrice = Math.max(...indicativePrices.map((price) => price.priceHigh));

  return { minPrice, maxPrice };
};

export const getCheapestRoute = (data: any) => {
  const cheapestRoute = data.reduce((prev: any, curr: any) => {
    const { indicativePrices: prevPrices } = prev;
    const { indicativePrices: currPrices } = curr;

    const { minPrice: prevMinPrice } = getPriceRange(prevPrices);
    const { minPrice: currMinPrice } = getPriceRange(currPrices);

    if (!prevMinPrice) {
      return curr;
    }

    if (!currMinPrice) {
      return prev;
    }

    return prevMinPrice < currMinPrice ? prev : curr;
  }, {});

  return cheapestRoute;
};

export const getBestRoute = (data: any) => {
  const bestRoute = data.reduce((prev: any, curr: any) => {
    const { indicativePrices: prevPrices } = prev;
    const { indicativePrices: currPrices } = curr;

    const { minPrice: prevMinPrice, maxPrice: prevMaxPrice } = getPriceRange(prevPrices);
    const { minPrice: currMinPrice, maxPrice: currMaxPrice } = getPriceRange(currPrices);

    if (!prevMinPrice) {
      return curr;
    }

    if (!currMinPrice) {
      return prev;
    }

    const prevPriceRange = prevMaxPrice - prevMinPrice;
    const currPriceRange = currMaxPrice - currMinPrice;

    return prevPriceRange < currPriceRange ? prev : curr;
  }, {});

  return bestRoute;
};
