import { IAction } from "../../libs/Core/Action/IAction";
import { IActionHandler } from "../../libs/Core/Action/IActionHandler";
import { Unit } from "../../libs/Core/Action/Unit";
import { IUIManager } from "../../libs/Core/UI/IUIManager";
import { config } from "../Config";

export class MouseMoveAction implements IAction {
    constructor(public readonly x: number, public readonly y: number) { }
}

export class MouseMoveActionHandler implements IActionHandler<MouseMoveAction> {

    constructor(private readonly uiManager: IUIManager) { }

    public handle(action: MouseMoveAction): Unit {
        const x = action.x / config.renderScale;
        const y = action.y / config.renderScale;

        // console.log(`Mousemove at: ${action.x} ${action.y}`);

        this.uiManager.handleHover(x, y);

        return Unit.value;
    }
}