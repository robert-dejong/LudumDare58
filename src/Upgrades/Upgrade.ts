import { Sprite } from "../../libs/Core/Screen/Sprite";
import { UpgradeType } from "./UpgradeType";

export class Upgrade {
    public upgradeType: UpgradeType;
    public name: string;
    public description: string;
    public icon: Sprite;
    public isPlaceable: boolean;
    public cost: (level: number) => number;

    constructor(upgradeType: UpgradeType, name: string, description: string, icon: Sprite, isPlaceable: boolean, cost: (level: number) => number) {
        this.upgradeType = upgradeType;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.isPlaceable = isPlaceable;
        this.cost = cost;
    }
}