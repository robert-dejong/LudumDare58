import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { ItemEntity } from "../Entity/ItemEntity";
import { CpuOverclockItem } from "../Entity/Items/CpuOverclockItem";
import { RamRepairItem } from "../Entity/Items/RamRepairItem";
import { RestartItem } from "../Entity/Items/RestartItem";
import { ILevel } from "../Level/ILevel";

const baseItemSpawnRateInSeconds = 25;
const randomItemSpawnRateInSeconds = 15;

type ItemSpawn = (x: number, y: number) => ItemEntity;

const itemSpawns: ItemSpawn[] = [
    (x, y) => new RamRepairItem(x, y),
];

const rareItemSpawns: ItemSpawn[] = [
    (x, y) => new CpuOverclockItem(x, y),
    (x, y) => new RestartItem(x, y),
];

export class ItemSpawnTask extends Task {
    private spawnItemInSeconds = 20;

    constructor(private readonly level: ILevel) {
        super(60, true, 'item-spawns');
    }

    public execute(): void {
        this.spawnItemInSeconds--;

        if (this.spawnItemInSeconds > 0) {
            return;
        }

        const xRange = (config.screenWidth / config.renderScale) - config.leftUiBarWidth - 14;
        const yRange = config.BottomUiBarHeight - 14;

        const x = Math.random() * xRange + 7 + config.leftUiBarWidth;
        const y = Math.random() * yRange + 7;

        const tableRoll = Math.random() * 2;
        const itemTable = tableRoll <= 1 ? rareItemSpawns : itemSpawns;

        const itemRoll = Math.floor(Math.random() * itemTable.length);
        const item = itemTable[itemRoll](x, y);

        this.level.add(item);
        this.spawnItemInSeconds = this.getNextItemSpawnInSeconds();
    }

    private getNextItemSpawnInSeconds = () => baseItemSpawnRateInSeconds + (Math.random() * randomItemSpawnRateInSeconds);
}