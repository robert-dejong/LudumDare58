import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { ItemEntity } from "../ItemEntity";
import { PlayerStats } from "../Player/PlayerStats";

export class RamRepairItem extends ItemEntity {

    public pickup(playerStats: PlayerStats) {
        this.removed = true;
        playerStats.addHealth(5);
    }

    public getSprite(): Sprite {
        return Sprites.ramIcon;
    }
}