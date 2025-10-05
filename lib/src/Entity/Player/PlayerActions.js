import { Mouse } from "../../../libs/Core/Input/Mouse";
import { UseBroomAction } from "../../Actions/Player/UseBroomAction";
import { config } from "../../Config";
import { Sprites } from "../../Sprites";
var PlayerActions = /** @class */ (function () {
    function PlayerActions(actionExecutor) {
        this.actionExecutor = actionExecutor;
        //private broomCooldown = 120;
        //private broomCooldownTimeLeft = 0;
        this.broomAnimationAnimationTime = 26;
        this.broomAnimationAnimationTimeLeft = 0;
    }
    PlayerActions.prototype.tick = function () {
        //if (this.broomCooldownTimeLeft > 0) {
        //    this.broomCooldownTimeLeft--;
        //}
        if (this.broomAnimationAnimationTimeLeft > 0) {
            this.broomAnimationAnimationTimeLeft--;
        }
    };
    PlayerActions.prototype.useBroom = function (x, y) {
        //if (this.broomCooldownTimeLeft > 0) return;
        if (this.broomAnimationAnimationTimeLeft <= 0) {
            this.broomAnimationAnimationTimeLeft = this.broomAnimationAnimationTime;
        }
        //this.broomCooldownTimeLeft = this.broomCooldown;
        this.actionExecutor.execute(new UseBroomAction(x, y));
    };
    PlayerActions.prototype.render = function (screen) {
        var mouseX = Mouse.x / config.renderScale;
        var mouseY = Mouse.y / config.renderScale;
        if (mouseX > config.leftUiBarWidth && mouseY < config.BottomUiBarHeight) {
            screen.setCursorVisibility(false);
            var sprite = this.broomAnimationAnimationTimeLeft >= (this.broomAnimationAnimationTime / 2) ? Sprites.broom2 : Sprites.broom;
            screen.render(sprite, mouseX, mouseY);
        }
        else {
            screen.setCursorVisibility(true);
        }
    };
    return PlayerActions;
}());
export { PlayerActions };
//# sourceMappingURL=PlayerActions.js.map