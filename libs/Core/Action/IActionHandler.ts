import { IAction } from "./IAction";
import { Unit } from "./Unit";

export type NonVoid<T> = T extends void ? never : T;

export interface IActionHandler<T extends IAction, U = Unit> {
    handle(action: T): NonVoid<U>;
}