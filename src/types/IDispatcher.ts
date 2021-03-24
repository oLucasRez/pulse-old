import { Dispatch, SetStateAction } from "react";

export type IDispatcher<T> = Dispatch<SetStateAction<T>>;
