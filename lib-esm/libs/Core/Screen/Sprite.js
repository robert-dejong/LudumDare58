var Sprite = /** @class */ (function () {
    function Sprite(path) {
        var _this = this;
        this.image = new Image();
        this.image.src = path;
        this.image.onload = function () {
            _this.width = _this.image.width;
            _this.height = _this.image.height;
            _this.loaded = true;
        };
    }
    return Sprite;
}());
export { Sprite };
//# sourceMappingURL=Sprite.js.map