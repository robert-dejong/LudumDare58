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
import { Sprites } from "../../Sprites";
import { ProjectileEntity } from "../ProjectileEntity";
var CpuThreadProjectileEntity = /** @class */ (function (_super) {
    __extends(CpuThreadProjectileEntity, _super);
    function CpuThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier) {
        return _super.call(this, x, y, directionX, directionY, 0.6, 1, speedModifier, damageModifier) || this;
    }
    CpuThreadProjectileEntity.prototype.getSprite = function () {
        return Sprites.cpuProjectile;
    };
    return CpuThreadProjectileEntity;
}(ProjectileEntity));
export { CpuThreadProjectileEntity };
//# sourceMappingURL=CpuThreadProjectileEntity.js.map