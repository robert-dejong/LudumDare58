var Key = /** @class */ (function () {
    function Key(keys) {
        this.pressed = false;
        this.keys = Array.isArray(keys) ? keys : [keys];
    }
    Object.defineProperty(Key.prototype, "isPressed", {
        get: function () {
            return this.pressed;
        },
        enumerable: false,
        configurable: true
    });
    Key.prototype.toggle = function (pressed) {
        this.pressed = pressed;
    };
    Key.prototype.release = function () {
        this.pressed = false;
    };
    return Key;
}());
export { Key };
//# sourceMappingURL=Key.js.map