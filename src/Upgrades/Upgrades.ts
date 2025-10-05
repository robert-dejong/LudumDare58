import { Sprites } from "../Sprites";
import { Upgrade } from "./Upgrade";
import { UpgradeType } from "./UpgradeType";

export class Upgrades {
    // Buyables
    public static cpuOverclock = new Upgrade(UpgradeType.CpuOverclock, 'CPU Overclock', '+ damage/speed', false, Sprites.overclockIcon, (level) => level * 100);
    public static ram = new Upgrade(UpgradeType.Ram, 'RAM', '+ memory', false, Sprites.ramIcon, (level) => level * 1000);

    // Placeables
    public static cpu = new Upgrade(UpgradeType.Cpu, 'CPU', '', true, Sprites.cpuIcon, (level) => level * 500);
    public static npu = new Upgrade(UpgradeType.Npu, 'NPU', '', true, Sprites.npuIcon, (level) => level * 2000);

    public static getUpgrades(): Array<Upgrade> {
        return [ 
            this.cpuOverclock,
            this.ram,
            this.cpu,
            this.npu,
        ];
    }
}