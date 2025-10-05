import { Sprites } from "../Sprites";
import { Upgrade } from "./Upgrade";
import { UpgradeType } from "./UpgradeType";

export class Upgrades {
    // Buyables
    public static cpuOverclock = new Upgrade(UpgradeType.CpuOverclock, 'CPU Overclock', '+ damage/speed', Sprites.overclockIcon, false, (level) => level * 100);
    public static ram = new Upgrade(UpgradeType.Ram, 'RAM', '+ memory', Sprites.ramIcon, false, (level) => level * 1000);
    public static broom = new Upgrade(UpgradeType.Broom, 'Broom', '+ Sweep damage', Sprites.broom, false, (level) => level * 100);

    // Placeables
    public static cpu = new Upgrade(UpgradeType.CpuThread, 'CPU Thread', '', Sprites.cpuIcon, true, () => 500);
    public static npu = new Upgrade(UpgradeType.NpuCore, 'NPU Core', '', Sprites.npuIcon, true, () => 2000);

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