import { IAction } from "./IAction";
import { IActionHandler } from "./IActionHandler";

export interface IActionExecutor {
    register<T extends IActionHandler<IAction, unknown>>(action: string, handler: () => T): void;
    execute<T>(action: IAction): T;
}