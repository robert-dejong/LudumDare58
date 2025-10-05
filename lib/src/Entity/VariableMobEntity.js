var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DamageRamAction } from "../Actions/Entity/DamageRam";
import { IncreasePointsAction } from "../Actions/Entity/IncreasePoints";
import { IncreaseScoreAction } from "../Actions/Entity/IncreaseScoreAction";
import { config } from "../Config";
import { MobEntity } from "./MobEntity";
var VariableMobEntity = /** @class */ (function (_super) {
    __extends(VariableMobEntity, _super);
    function VariableMobEntity(options) {
        var _this = _super.call(this, 0, 0) || this;
        _this.healthBarWidth = 15;
        _this.options = options;
        _this.speed = options.speed;
        _this.maxHealth = options.health;
        _this.health = options.health;
        _this.renderOrder = 1;
        return _this;
    }
    VariableMobEntity.prototype.getSprite = function () {
        return { loaded: true, width: this.options.width, height: this.options.height };
    };
    VariableMobEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.move(-this.speed, 0);
        if (this.x <= config.leftUiBarWidth) {
            this.executeAction(new DamageRamAction(this.options.damage));
            this.removed = true;
            return;
        }
    };
    VariableMobEntity.prototype.setHealthModifier = function (modifier) {
        this.maxHealth *= modifier;
        this.health = this.maxHealth;
    };
    VariableMobEntity.prototype.setSpeedModifier = function (modifier) {
        this.speed *= modifier;
    };
    VariableMobEntity.prototype.render = function (screen) {
        screen.renderRectangle(this.x, this.y, this.getSprite().width, this.getSprite().height, { color: '#f8f8f8', alpha: 0.6 });
        screen.renderText(this.options.name, this.x + 2, this.y + (this.getSprite().height / 2) + 1, { fontColor: '#122285', fontSize: 4, fontWeight: 600 });
        var healthSize = (this.healthBarWidth / this.maxHealth) * this.health;
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, this.healthBarWidth, 1, { color: 'red' });
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, healthSize, 1, { color: 'green' });
    };
    VariableMobEntity.prototype.dealDamage = function (amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.removed = true;
            this.executeAction(new IncreasePointsAction(this.options.points));
            this.executeAction(new IncreaseScoreAction(this.options.damage));
        }
    };
    return VariableMobEntity;
}(MobEntity));
export { VariableMobEntity };
//# sourceMappingURL=VariableMobEntity.js.map