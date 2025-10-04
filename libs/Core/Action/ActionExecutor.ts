import { IAction } from "./IAction";
import { IActionExecutor } from "./IActionExecutor";
import { IActionHandler } from "./IActionHandler";

class ActionExecutor implements IActionExecutor {
    private readonly handlers: Map<string, () => IActionHandler<IAction, unknown>>;

    constructor() {
        this.handlers = new Map<string, () => IActionHandler<IAction, unknown>>;
    }

    public register<T extends IActionHandler<IAction, unknown>>(action: string, handler: () => T) {
        this.handlers.set(action, handler);
    }

    public execute<T>(action: IAction): T {
        if (!this.handlers.has(action.constructor.name)) {
            throw new Error(`Could not find handler for action '${action.constructor.name}'`);
        }

        const handler = this.handlers.get(action.constructor.name);
        return handler().handle(action) as T;
    }
}

export const createActionExecutor = () => new ActionExecutor();