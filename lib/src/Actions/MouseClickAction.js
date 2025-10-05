import { Unit } from "../../libs/Core/Action/Unit";
import { config } from "../Config";
import { Main } from "../Main";
var MouseClickAction = /** @class */ (function () {
    function MouseClickAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseClickAction;
}());
export { MouseClickAction };
var MouseClickActionHandler = /** @class */ (function () {
    function MouseClickActionHandler(uiManager, playerActions, playerStats) {
        this.uiManager = uiManager;
        this.playerActions = playerActions;
        this.playerStats = playerStats;
    }
    MouseClickActionHandler.prototype.handle = function (action) {
        var x = action.x / config.renderScale;
        var y = action.y / config.renderScale;
        // console.log(`Mouseclick at: ${action.x} ${action.y}`);
        if (Main.paused)
            return;
        if (this.playerStats.isDied())
            return;
        this.uiManager.handleClick(x, y);
        this.playerActions.useBroom(x, y);
        return Unit.value;
    };
    return MouseClickActionHandler;
}());
export { MouseClickActionHandler };
//# sourceMappingURL=MouseClickAction.js.map