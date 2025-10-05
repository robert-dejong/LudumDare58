import { config } from "../Config";
import { Sprites } from "../Sprites";
import { Upgrade } from "./Upgrade";
import { UpgradeType } from "./UpgradeType";
var Upgrades = /** @class */ (function () {
    function Upgrades() {
    }
    Upgrades.getUpgrades = function () {
        return [
            this.cpuOverclock,
            this.ram,
            this.broom,
            this.cpu,
            this.npu,
        ];
    };
    // Buyables
    Upgrades.cpuOverclock = new Upgrade(UpgradeType.CpuOverclock, 'CPU Overclock', "+".concat(config.cpuThreadModifierPerLevelPercentage, "% dmg/speed"), Sprites.overclockIcon, false, function (level) { return 25 + (level * 15); });
    Upgrades.ram = new Upgrade(UpgradeType.Ram, 'RAM', "+".concat(config.memoryIncreasePerLevel, "MB memory"), Sprites.ramIcon, false, function (level) { return 40 + (level * 10); });
    Upgrades.broom = new Upgrade(UpgradeType.Broom, 'Broom', "+".concat(config.broomDamageIncreasePerLevelPercentage, "% sweep dmg"), Sprites.broom, false, function (level) { return 10 + (level * 20); });
    // Placeables
    Upgrades.cpu = new Upgrade(UpgradeType.CpuThread, 'CPU Thread', 'Placeable turret', Sprites.cpuIcon, true, function (level) { return 10 + (level * 20); });
    Upgrades.npu = new Upgrade(UpgradeType.NpuCore, 'NPU Core', 'Placeable turret', Sprites.npuIcon, true, function (level) { return 80 + (level * 30); });
    return Upgrades;
}());
export { Upgrades };
//# sourceMappingURL=Upgrades.js.map