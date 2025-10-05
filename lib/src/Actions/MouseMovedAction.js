import { Unit } from "../../libs/Core/Action/Unit";
import { config } from "../Config";
var MouseMoveAction = /** @class */ (function () {
    function MouseMoveAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseMoveAction;
}());
export { MouseMoveAction };
var MouseMoveActionHandler = /** @class */ (function () {
    function MouseMoveActionHandler(uiManager) {
        this.uiManager = uiManager;
    }
    MouseMoveActionHandler.prototype.handle = function (action) {
        var x = action.x / config.renderScale;
        var y = action.y / config.renderScale;
        // console.log(`Mousemove at: ${action.x} ${action.y}`);
        this.uiManager.handleHover(x, y);
        return Unit.value;
    };
    return MouseMoveActionHandler;
}());
export { MouseMoveActionHandler };
//# sourceMappingURL=MouseMovedAction.js.map