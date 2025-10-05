import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { IScreen } from "../../../libs/Core/Screen/IScreen";
import { config } from "../../Config";
import { ThreadMobEntity } from "../../Entity/Mobs/ThreadMobEntity";
import { PlayerStats } from "../../Entity/Player/PlayerStats";
import { ILevel } from "../../Level/ILevel";
import { Upgrade } from "../../Upgrades/Upgrade";

export class BuyPlaceableAction implements IAction {
    constructor(
        public readonly upgrade: Upgrade, 
        public readonly x: number, 
        public readonly y: number) { }
}

export class BuyPlaceableActionHandler implements IActionHandler<BuyPlaceableAction> {
    constructor(
        private readonly playerStats: PlayerStats, 
        private readonly level: ILevel, 
        private readonly screen: IScreen) { }

    public handle(action: BuyPlaceableAction): Unit {
        const entity = new ThreadMobEntity(action.x, action.y);

        if (action.x < config.leftUiBarWidth) return;
        if (action.y < 0) return;
        if (action.x + entity.getSprite().width > this.screen.getSize().width) return;
        if (action.y + entity.getSprite().height > config.BottomUiBarHeight) return;

        this.playerStats.buyUpgrade(action.upgrade);
        this.level.add(entity);

        return Unit.value;
    }
}