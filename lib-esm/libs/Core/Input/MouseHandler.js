import { Mouse } from "./Mouse";
var MouseHandler = /** @class */ (function () {
    function MouseHandler() {
    }
    MouseHandler.bind = function (type, action) {
        var _this = this;
        if (type === 'mousedrag') {
            this.bindMouseDrag(action);
            return;
        }
        var event = function (e) {
            Mouse.x = e.offsetX;
            Mouse.y = e.offsetY;
            if (type === 'mousemove' && _this.isPressed)
                return;
            action(e.offsetX, e.offsetY);
        };
        document.getElementById('canvas').addEventListener(type, event);
    };
    MouseHandler.bindMouseDrag = function (action) {
        var _this = this;
        document.getElementById('canvas').addEventListener('mousedown', function () {
            _this.isPressed = true;
        });
        document.getElementById('canvas').addEventListener('mouseup', function () {
            _this.isPressed = false;
        });
        document.getElementById('canvas').addEventListener('mousemove', function (e) {
            if (_this.isPressed) {
                action(e.offsetX, e.offsetY);
            }
        });
    };
    return MouseHandler;
}());
export { MouseHandler };
//# sourceMappingURL=MouseHandler.js.map