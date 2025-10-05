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
var ArrayMobEntity = /** @class */ (function (_super) {
    __extends(ArrayMobEntity, _super);
    function ArrayMobEntity() {
        return _super.call(this, { name: 'String[] todo', width: 31, height: 9, speed: 0.22, damage: 8, health: 5, points: 3 }) || this;
    }
    return ArrayMobEntity;
}(VariableMobEntity));
export { ArrayMobEntity };
//# sourceMappingURL=ArrayMobEntity.js.map