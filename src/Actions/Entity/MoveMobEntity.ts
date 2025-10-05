import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { Direction } from "../../../libs/Core/Util/Direction";
import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { MobEntity } from "../../Entity/MobEntity";
import { Player } from "../../Entity/Player/Player";
import { ILevel } from "../../Level/ILevel";

export class MoveMobEntityAction implements IAction {
    constructor(
        public readonly entity: MobEntity,
        public readonly moveX: number,
        public readonly moveY: number) { }
}

export class MoveMobEntityActionHandler implements IActionHandler<MoveMobEntityAction> {

    constructor(private readonly level: ILevel) { }

    public handle(action: MoveMobEntityAction): Unit {
        const entity = action.entity;
        let { moveX, moveY } = action;

        if (moveX === 0 && moveY === 0) return;

        if (entity.animations) {
            entity.walkTime++;

            if (entity.animations.isNextAnimation(entity.walkTime)) {
                entity.animationIndex = entity.animations.nextIndex(entity.direction, entity.animationIndex);
                entity.walkTime = 0;
            }
        }

        const canMoveX = this.canMove(entity, moveX, 0);
        const canMoveY = this.canMove(entity, 0, moveY);
        const canMove = this.canMove(entity, moveX, moveY);

        if (!canMoveX && !canMoveY && !canMove) return;

        if (!canMoveX) moveX = 0;
        if (!canMoveY) moveY = 0;

        if (moveX === 0 && moveY === 0) return;

        entity.x += moveX;
        entity.y += moveY;
        entity.direction = Direction.get(moveX, moveY);
    }

    private canMove(target: MobEntity, moveX: number, moveY: number): boolean {
        const isPlayer = target instanceof Player;
        const entities = this.level.getEntities();
        let canMove = true;

        const newX = target.x + moveX;
        const newY = target.y + moveY;

        if (isPlayer) {
            if (newX <= config.leftUiBarWidth) return false;
            if (newY < 0) return false;
            if (newX + target.getSprite().width > config.screenWidth / config.renderScale) return false;
            if (newY + target.getSprite().height >= config.BottomUiBarHeight) return false;
        }

        for(const entity of entities) {
            if (entity === target) continue;

            if (!Maths.intersects(
                newX, newY, target.getSprite().width, target.getSprite().height, 
                entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                continue;
            }
            
            target.onCollide(entity);
            entity.onCollide(target);

            if (!entity.canPass() && isPlayer) {
                canMove = false;
            }
        }

        return canMove;
    }
}