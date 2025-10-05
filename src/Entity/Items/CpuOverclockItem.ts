import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { Upgrades } from "../../Upgrades/Upgrades";
import { ItemEntity } from "../ItemEntity";
import { PlayerStats } from "../Player/PlayerStats";

export class CpuOverclockItem extends ItemEntity {

    public pickup(playerStats: PlayerStats) {
        this.removed = true;
        playerStats.giveUpgrade(Upgrades.cpuOverclock);
    }

    public getSprite(): Sprite {
        return Sprites.overclockIcon;
    }
}