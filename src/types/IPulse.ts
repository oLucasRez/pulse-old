import { IVector } from "./IVector";
import { IColor } from "./IColor";

export interface IPulse {
  origin: IVector;
  gap: number;
  amount: number;
  color: IColor;
}
