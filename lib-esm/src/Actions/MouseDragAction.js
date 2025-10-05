import { Unit } from "../../libs/Core/Action/Unit";
import { config } from "../Config";
var MouseDragAction = /** @class */ (function () {
    function MouseDragAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseDragAction;
}());
export { MouseDragAction };
var MouseDragActionHandler = /** @class */ (function () {
    function MouseDragActionHandler(uiManager) {
        this.uiManager = uiManager;
    }
    MouseDragActionHandler.prototype.handle = function (action) {
        var x = action.x / config.renderScale;
        var y = action.y / config.renderScale;
        // console.log(`DRAG at: ${action.x} ${action.y}`);
        this.uiManager.handleDrag(x, y);
        return Unit.value;
    };
    return MouseDragActionHandler;
}());
export { MouseDragActionHandler };
//# sourceMappingURL=MouseDragAction.js.map