import {GasPrice} from "./gas-price";

export interface GasPriceData {
  payload: {
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    gas_prices: GasPrice[];
  };
}
