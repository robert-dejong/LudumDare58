import { Unit } from "../../../libs/Core/Action/Unit";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
var ClearLevelAction = /** @class */ (function () {
    function ClearLevelAction() {
    }
    return ClearLevelAction;
}());
export { ClearLevelAction };
var ClearLevelActionHandler = /** @class */ (function () {
    function ClearLevelActionHandler(level) {
        this.level = level;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ClearLevelActionHandler.prototype.handle = function (action) {
        var mobEntities = this.level.getEntities().filter(this.isVariableMobEntity);
        for (var _i = 0, mobEntities_1 = mobEntities; _i < mobEntities_1.length; _i++) {
            var entity = mobEntities_1[_i];
            entity.dealDamage(Number.MAX_VALUE);
        }
        return Unit.value;
    };
    ClearLevelActionHandler.prototype.isVariableMobEntity = function (e) {
        return e instanceof VariableMobEntity;
    };
    return ClearLevelActionHandler;
}());
export { ClearLevelActionHandler };
//# sourceMappingURL=ClearLevel.js.map