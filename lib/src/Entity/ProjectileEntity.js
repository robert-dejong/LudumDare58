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
import { config } from "../Config";
import { MobEntity } from "./MobEntity";
import { VariableMobEntity } from "./VariableMobEntity";
var ProjectileEntity = /** @class */ (function (_super) {
    __extends(ProjectileEntity, _super);
    function ProjectileEntity(x, y, directionX, directionY, speed, damage, speedModifier, damageModifier) {
        var _this = _super.call(this, x, y) || this;
        _this.destroyOnCollide = true;
        _this.damage = damage * damageModifier;
        _this.speed = speed * speedModifier;
        _this.directionX = directionX;
        _this.directionY = directionY;
        _this.renderOrder = 9;
        return _this;
    }
    ProjectileEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        var moveX = this.directionX * this.speed;
        var moveY = this.directionY * this.speed;
        this.move(moveX, moveY);
        var screenWidth = (config.screenWidth / config.renderScale);
        if (this.x < config.leftUiBarWidth || this.x > screenWidth || this.y < 0 || this.y > config.BottomUiBarHeight) {
            this.removed = true;
        }
    };
    ProjectileEntity.prototype.onCollide = function (entity) {
        if (!(entity instanceof VariableMobEntity))
            return;
        var variableMobEntity = entity;
        variableMobEntity.dealDamage(this.damage);
        if (this.destroyOnCollide) {
            this.removed = true;
        }
        else {
            this.damage *= 0.5;
            if (this.damage < 1) {
                this.removed = true;
            }
        }
    };
    return ProjectileEntity;
}(MobEntity));
export { ProjectileEntity };
//# sourceMappingURL=ProjectileEntity.js.map