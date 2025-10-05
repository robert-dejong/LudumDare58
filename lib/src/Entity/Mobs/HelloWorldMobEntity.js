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
var HelloWorldMobEntity = /** @class */ (function (_super) {
    __extends(HelloWorldMobEntity, _super);
    function HelloWorldMobEntity() {
        return _super.call(this, { name: 'string helloWorld', width: 37, height: 9, speed: 0.25, damage: 5, health: 1, points: 2 }) || this;
    }
    return HelloWorldMobEntity;
}(VariableMobEntity));
export { HelloWorldMobEntity };
//# sourceMappingURL=HelloWorldMobEntity.js.map