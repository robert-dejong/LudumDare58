import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { ClearLevelAction } from "../../Actions/Level/ClearLevel";
import { Sprites } from "../../Sprites";
import { ItemEntity } from "../ItemEntity";
import { PlayerStats } from "../Player/PlayerStats";

export class RestartItem extends ItemEntity {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public pickup(playerStats: PlayerStats) {
        this.removed = true;
        this.executeAction(new ClearLevelAction());
    }

    public getSprite(): Sprite {
        return Sprites.restartIcon;
    }

    public getEffectSprite(): Sprite {
        return Sprites.itemPlusIcon;
    }
}