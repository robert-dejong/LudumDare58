import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { Entity } from "../../Entity/Entity";
import { PlayerStats } from "../../Entity/Player/PlayerStats";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
import { ILevel } from "../../Level/ILevel";
import { Sprites } from "../../Sprites";
import { UpgradeType } from "../../Upgrades/UpgradeType";

export class UseBroomAction implements IAction {
    constructor(
        public readonly x: number, 
        public readonly y: number) { }
}

export class UseBroomActionHandler implements IActionHandler<UseBroomAction> {

    constructor(
        private readonly level: ILevel, 
        private readonly playerStats: PlayerStats) { }
        
    public handle(action: UseBroomAction): Unit {
        const entities = this.level.getEntities().filter(this.isVariableMobEntity);
        const broomLevel = this.playerStats.getUpgradeLevel(UpgradeType.Broom);
        const damage = broomLevel * config.broomDamageIncreasePerLevel;

        for(const entity of entities) {
            if (Maths.intersects(action.x, action.y, Sprites.broom.width, Sprites.broom.height, entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                entity.dealDamage(damage);
                return;
            }
        }

        return Unit.value;
    }

    private isVariableMobEntity(e: Entity): e is VariableMobEntity {
        return e instanceof VariableMobEntity;
    }
}