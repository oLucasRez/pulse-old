import { IArrow } from "./IArrow";
import { IText } from "./IText";

export interface INote {
  arrow: IArrow;
  question: IText;
  answers: IText[];
  fact?: number;
}
