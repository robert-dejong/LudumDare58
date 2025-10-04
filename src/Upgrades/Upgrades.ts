import { Sprites } from "../Sprites";
import { Upgrade } from "./Upgrade";
import { UpgradeType } from "./UpgradeType";

export class Upgrades {
    public static cpu = new Upgrade(UpgradeType.Cpu, 'CPU Speed', '+ damage/speed', Sprites.cpuIcon, (level) => level * 100);
    public static thread = new Upgrade(UpgradeType.Threads, 'CPU Threads', '+ extra worker', Sprites.threadsIcon, (level) => level * 500);
    public static ram = new Upgrade(UpgradeType.Ram, 'RAM', '+ memory', Sprites.ramIcon, (level) => level * 1000);

    public static getUpgrades(): Array<Upgrade> {
        return [ 
            this.cpu,
            this.thread,
            this.ram,
        ];
    }
}