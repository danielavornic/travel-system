export interface Route {
  name: string;
  duration: number;
  price: number;
  mode: string;
  indicativePrices: IndicativePrice[];
  paths?: string[];
  label?: string;
}

export enum RouteMode {
  Flight = "flight",
  Train = "train",
  Bus = "bus",
  Car = "car",
}

export interface IndicativePrice {
  className: string;
  isDisplay: boolean;
  useInRange: boolean;
  currencyCode: string;
  price: number;
  priceLow: number;
  priceHigh: number;
  nativeCurrencyCode: string;
  nativePrice: number;
  nativePriceLow: number;
  nativePriceHigh: number;
}
