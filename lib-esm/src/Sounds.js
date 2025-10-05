import { createSound } from "../libs/Core/Sound/Sound";
import { config } from "./Config";
var Sounds = /** @class */ (function () {
    function Sounds() {
    }
    Sounds.test = loadSound('hurt.wav');
    return Sounds;
}());
export { Sounds };
function loadSound(sound) {
    return createSound("".concat(config.soundBasePath, "/").concat(sound));
}
//# sourceMappingURL=Sounds.js.map