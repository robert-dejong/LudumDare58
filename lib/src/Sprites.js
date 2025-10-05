import { Sprite } from "../libs/Core/Screen/Sprite";
import { config } from "./Config";
var Sprites = /** @class */ (function () {
    function Sprites() {
    }
    Sprites.ram = loadImage('ram.png');
    Sprites.ramIcon = loadImage('ram_icon.png');
    Sprites.overclockIcon = loadImage('overclock_icon.png');
    Sprites.npuIcon = loadImage('npu_icon.png');
    Sprites.npuProjectile = loadImage('npu_projectile2.png');
    Sprites.cpuIcon = loadImage('cpu_icon.png');
    Sprites.cpuProjectile = loadImage('cpu_projectile.png');
    Sprites.broom = loadImage('broom.png');
    Sprites.broom2 = loadImage('broom2.png');
    Sprites.background = loadImage('motherboard.png');
    Sprites.itemPlusIcon = loadImage('plus.png');
    Sprites.itemUpgradeIcon = loadImage('item_upgrade_icon.png');
    Sprites.restartIcon = loadImage('restart.png');
    return Sprites;
}());
export { Sprites };
function loadImage(image) {
    return new Sprite("".concat(config.imageBasePath, "/").concat(image));
}
//# sourceMappingURL=Sprites.js.map