import { config } from "../Config";
import { Sprites } from "../Sprites";
import { Upgrade } from "./Upgrade";
import { UpgradeType } from "./UpgradeType";

export class Upgrades {
    // Buyables
    public static cpuOverclock = new Upgrade(UpgradeType.CpuOverclock, 'CPU Overclock', `+${config.cpuThreadModifierPerLevelPercentage}% dmg/speed`, Sprites.overclockIcon, false, (level) => 25 + (level * 15));
    public static ram = new Upgrade(UpgradeType.Ram, 'RAM', `+${config.memoryIncreasePerLevel}MB memory`, Sprites.ramIcon, false, (level) => 40 + (level * 10));
    public static broom = new Upgrade(UpgradeType.Broom, 'Broom', `+${config.broomDamageIncreasePerLevelPercentage}% sweep dmg`, Sprites.broom, false, (level) => 10 + (level * 20));

    // Placeables
    public static cpu = new Upgrade(UpgradeType.CpuThread, 'CPU Thread', 'Placeable turret', Sprites.cpuIcon, true, (level) => 10 + (level * 20));
    public static npu = new Upgrade(UpgradeType.NpuCore, 'NPU Core', 'Placeable turret', Sprites.npuIcon, true, (level) => 80 + (level * 30));

    public static getUpgrades(): Array<Upgrade> {
        return [ 
            this.cpuOverclock,
            this.ram,
            this.broom,
            this.cpu,
            this.npu,
        ];
    }
}