import {Payload} from "./payload";

export interface GenericResponse {
  successful: boolean;
  message: string;
  payload: Payload;
}
