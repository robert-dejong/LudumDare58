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
import { WorkerEntity } from "../WorkerEntity";
var CpuThreadMobEntity = /** @class */ (function (_super) {
    __extends(CpuThreadMobEntity, _super);
    function CpuThreadMobEntity(x, y) {
        return _super.call(this, x, y, 'cpu', 300) || this;
    }
    CpuThreadMobEntity.prototype.getSprite = function () {
        return Sprites.cpuIcon;
    };
    return CpuThreadMobEntity;
}(WorkerEntity));
export { CpuThreadMobEntity };
//# sourceMappingURL=CpuThreadMobEntity.js.map