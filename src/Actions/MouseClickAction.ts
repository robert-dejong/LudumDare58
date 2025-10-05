import { IAction } from "../../libs/Core/Action/IAction";
import { IActionHandler } from "../../libs/Core/Action/IActionHandler";
import { Unit } from "../../libs/Core/Action/Unit";
import { IUIManager } from "../../libs/Core/UI/IUIManager";
import { config } from "../Config";
import { PlayerActions } from "../Entity/Player/PlayerActions";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { Main } from "../Main";

export class MouseClickAction implements IAction {
    constructor(public readonly x: number, public readonly y: number) { }
}

export class MouseClickActionHandler implements IActionHandler<MouseClickAction> {

    constructor(
        private readonly uiManager: IUIManager, 
        private readonly playerActions: PlayerActions, 
        private readonly playerStats: PlayerStats) { }

    public handle(action: MouseClickAction): Unit {
        const x = action.x / config.renderScale;
        const y = action.y / config.renderScale;

        // console.log(`Mouseclick at: ${action.x} ${action.y}`);

        if (Main.paused) return;
        if (this.playerStats.isDied()) return;
        
        this.uiManager.handleClick(x, y);
        this.playerActions.useBroom(x, y);

        return Unit.value;
    }
}