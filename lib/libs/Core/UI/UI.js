var UI = /** @class */ (function () {
    function UI() {
        var _this = this;
        this.isShow = function () { return _this.show; };
        this.setMousePosition = function (x, y) { (_this.mouseX = x, _this.mouseY = y); };
        this.toggle = function () {
            _this.show = !_this.show;
            if (!_this.show) {
                _this.reset();
            }
        };
    }
    UI.prototype.click = function (x, y) { };
    UI.prototype.hover = function (x, y) { };
    UI.prototype.drag = function (x, y) { };
    UI.prototype.resetHover = function () { };
    UI.prototype.resetDrag = function () { };
    UI.prototype.reset = function () {
        this.resetHover();
        this.resetDrag();
    };
    return UI;
}());
export { UI };
//# sourceMappingURL=UI.js.map