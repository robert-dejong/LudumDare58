var KeyHandler = /** @class */ (function () {
    function KeyHandler() {
    }
    KeyHandler.init = function (binds) {
        var _loop_1 = function (value) {
            value.keys.forEach(function (key) { return KeyHandler.binds.set(key, value); });
        };
        for (var _i = 0, _a = Object.entries(binds); _i < _a.length; _i++) {
            var _b = _a[_i], value = _b[1];
            _loop_1(value);
        }
        KeyHandler.keyEvent('keydown');
        KeyHandler.keyEvent('keyup');
    };
    KeyHandler.keyEvent = function (type) {
        var pressed = type === 'keydown';
        window.addEventListener(type, function (e) {
            // e.preventDefault();
            // console.log("Pressing key: " + e.key);
            if (!KeyHandler.binds.has(e.key))
                return;
            var bind = KeyHandler.binds.get(e.key);
            bind.toggle(pressed);
        });
    };
    KeyHandler.binds = new Map();
    return KeyHandler;
}());
export { KeyHandler };
//# sourceMappingURL=KeyHandler.js.map