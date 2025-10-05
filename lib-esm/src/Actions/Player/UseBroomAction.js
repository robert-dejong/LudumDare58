import { Unit } from "../../../libs/Core/Action/Unit";
import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { ItemEntity } from "../../Entity/ItemEntity";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
import { Sprites } from "../../Sprites";
import { UpgradeType } from "../../Upgrades/UpgradeType";
var UseBroomAction = /** @class */ (function () {
    function UseBroomAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return UseBroomAction;
}());
export { UseBroomAction };
var UseBroomActionHandler = /** @class */ (function () {
    function UseBroomActionHandler(level, playerStats) {
        this.level = level;
        this.playerStats = playerStats;
    }
    UseBroomActionHandler.prototype.handle = function (action) {
        var mobEntities = this.level.getEntities().filter(this.isVariableMobEntity);
        var itemEntities = this.level.getEntities().filter(this.isItemEntity);
        var broomLevel = this.playerStats.getUpgradeLevel(UpgradeType.Broom);
        var damage = config.broomBaseDamage * config.getBroomDamageModifier(broomLevel);
        for (var _i = 0, itemEntities_1 = itemEntities; _i < itemEntities_1.length; _i++) {
            var item = itemEntities_1[_i];
            if (Maths.intersects(action.x, action.y, Sprites.broom.width, Sprites.broom.height, item.x, item.y, item.getSprite().width, item.getSprite().height)) {
                item.pickup(this.playerStats);
            }
        }
        for (var _a = 0, mobEntities_1 = mobEntities; _a < mobEntities_1.length; _a++) {
            var entity = mobEntities_1[_a];
            if (Maths.intersects(action.x, action.y, Sprites.broom.width, Sprites.broom.height, entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                entity.dealDamage(damage);
            }
        }
        return Unit.value;
    };
    UseBroomActionHandler.prototype.isVariableMobEntity = function (e) {
        return e instanceof VariableMobEntity;
    };
    UseBroomActionHandler.prototype.isItemEntity = function (e) {
        return e instanceof ItemEntity;
    };
    return UseBroomActionHandler;
}());
export { UseBroomActionHandler };
//# sourceMappingURL=UseBroomAction.js.map