import { Maths } from "../Util/Maths";
var UIManager = /** @class */ (function () {
    // !Maths.intersects(this.dragStartX, this.dragStartY, 0, 0, e.offsetX - (dragThreshold / 2), e.offsetY - (dragThreshold / 2), dragThreshold, dragThreshold)
    function UIManager() {
        var _this = this;
        this.toggle = function (name) { return _this.interfaces.get(name).toggle(); };
        this.add = function (name, ui) { (_this.interfaces.set(name, ui)); };
        this.interfaces = new Map();
    }
    UIManager.prototype.tick = function () {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            ui.tick();
        });
    };
    UIManager.prototype.render = function (screen) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            ui.render(screen);
        });
    };
    UIManager.prototype.handleClick = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.reset();
            //if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
            ui.click(x - position.x, y - position.y);
            //}
        });
    };
    UIManager.prototype.handleHover = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.setMousePosition(x, y);
            ui.resetHover();
            if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.reset();
                ui.hover(x - position.x, y - position.y);
            }
        });
    };
    UIManager.prototype.handleDrag = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.setMousePosition(x, y);
            if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.resetHover();
                ui.drag(x - position.x, y - position.y);
            }
        });
    };
    return UIManager;
}());
export var createUIManager = function () { return new UIManager(); };
//# sourceMappingURL=UIManager.js.map