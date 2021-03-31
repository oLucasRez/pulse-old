import { IColor } from "./IColor";
import { IVector } from "./IVector";

export interface IDice {
  origin?: IVector;
  sides: number;
  value: number;
  color: IColor;
}
