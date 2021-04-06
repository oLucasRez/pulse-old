import { Arrow } from "./Arrow.type";
import { Text } from "./Text.type";

export interface Note {
  arrow: Arrow;
  question: Text;
  answers: Text[];
  fact?: number;
}
