import { Direction } from "../../../libs/Core/Util/Direction";
import { Maths } from "../../../libs/Core/Util/Maths";
var MoveMobEntityAction = /** @class */ (function () {
    function MoveMobEntityAction(entity, moveX, moveY) {
        this.entity = entity;
        this.moveX = moveX;
        this.moveY = moveY;
    }
    return MoveMobEntityAction;
}());
export { MoveMobEntityAction };
var MoveMobEntityActionHandler = /** @class */ (function () {
    function MoveMobEntityActionHandler(level) {
        this.level = level;
    }
    MoveMobEntityActionHandler.prototype.handle = function (action) {
        var entity = action.entity;
        var moveX = action.moveX, moveY = action.moveY;
        if (moveX === 0 && moveY === 0)
            return;
        if (entity.animations) {
            entity.walkTime++;
            if (entity.animations.isNextAnimation(entity.walkTime)) {
                entity.animationIndex = entity.animations.nextIndex(entity.direction, entity.animationIndex);
                entity.walkTime = 0;
            }
        }
        var canMoveX = this.canMove(entity, moveX, 0);
        var canMoveY = this.canMove(entity, 0, moveY);
        var canMove = this.canMove(entity, moveX, moveY);
        if (!canMoveX && !canMoveY && !canMove)
            return;
        if (!canMoveX)
            moveX = 0;
        if (!canMoveY)
            moveY = 0;
        if (moveX === 0 && moveY === 0)
            return;
        entity.x += moveX;
        entity.y += moveY;
        entity.direction = Direction.get(moveX, moveY);
    };
    MoveMobEntityActionHandler.prototype.canMove = function (target, moveX, moveY) {
        var entities = this.level.getEntities();
        var newX = target.x + moveX;
        var newY = target.y + moveY;
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            if (entity === target)
                continue;
            if (!Maths.intersects(newX, newY, target.getSprite().width, target.getSprite().height, entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                continue;
            }
            target.onCollide(entity);
            entity.onCollide(target);
        }
        return true;
    };
    return MoveMobEntityActionHandler;
}());
export { MoveMobEntityActionHandler };
//# sourceMappingURL=MoveMobEntity.js.map