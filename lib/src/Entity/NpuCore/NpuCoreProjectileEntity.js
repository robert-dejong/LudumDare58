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
var NpuCoreProjectileEntity = /** @class */ (function (_super) {
    __extends(NpuCoreProjectileEntity, _super);
    function NpuCoreProjectileEntity(x, y, directionX, directionY) {
        var _this = _super.call(this, x, y, directionX, directionY, 0.9, 40, 1.0, 1.0) || this;
        _this.destroyOnCollide = false;
        return _this;
    }
    NpuCoreProjectileEntity.prototype.getSprite = function () {
        return Sprites.npuProjectile;
    };
    return NpuCoreProjectileEntity;
}(ProjectileEntity));
export { NpuCoreProjectileEntity };
//# sourceMappingURL=NpuCoreProjectileEntity.js.map