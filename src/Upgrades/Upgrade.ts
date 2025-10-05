import { Sprite } from "../../libs/Core/Screen/Sprite";
import { UpgradeType } from "./UpgradeType";

export class Upgrade {
    public upgradeType: UpgradeType;
    public name: string;
    public description: string;
    public isPlaceable: boolean;
    public sprite: Sprite;
    public cost: (level: number) => number;

    constructor(upgradeType: UpgradeType, name: string, description: string, isPlaceable: boolean, sprite: Sprite, cost: (level: number) => number) {
        this.upgradeType = upgradeType;
        this.name = name;
        this.description = description;
        this.isPlaceable = isPlaceable;
        this.sprite = sprite;
        this.cost = cost;
    }
}