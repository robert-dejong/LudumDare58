import { settings } from "../Settings/Settings";
var Sound = /** @class */ (function () {
    function Sound(path) {
        var _this = this;
        this.clip = new Audio(path);
        this.clip.oncanplay = function () {
            _this.loaded = true;
        };
    }
    Sound.prototype.play = function () {
        if (!this.loaded || settings.isMuted())
            return;
        this.clip.play();
    };
    return Sound;
}());
export var createSound = function (path) { return new Sound(path); };
//# sourceMappingURL=Sound.js.map