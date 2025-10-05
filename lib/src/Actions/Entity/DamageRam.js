import { Unit } from "../../../libs/Core/Action/Unit";
var DamageRamAction = /** @class */ (function () {
    function DamageRamAction(damage) {
        this.damage = damage;
    }
    return DamageRamAction;
}());
export { DamageRamAction };
var DamageRamActionHandler = /** @class */ (function () {
    function DamageRamActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    DamageRamActionHandler.prototype.handle = function (action) {
        this.playerStats.dealDamage(action.damage);
        return Unit.value;
    };
    return DamageRamActionHandler;
}());
export { DamageRamActionHandler };
//# sourceMappingURL=DamageRam.js.map