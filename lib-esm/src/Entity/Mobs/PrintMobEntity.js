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
import { VariableMobEntity } from "../VariableMobEntity";
var PrintMobEntity = /** @class */ (function (_super) {
    __extends(PrintMobEntity, _super);
    function PrintMobEntity() {
        return _super.call(this, { name: 'print(\'debug\')', width: 32, height: 10, speed: 0.35, damage: 7, health: 0.5, points: 2 }) || this;
    }
    return PrintMobEntity;
}(VariableMobEntity));
export { PrintMobEntity };
//# sourceMappingURL=PrintMobEntity.js.map