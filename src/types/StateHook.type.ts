import { Dispatcher } from "./Dispatcher.type";

export type StateHook<T> = [T, Dispatcher<T>];
