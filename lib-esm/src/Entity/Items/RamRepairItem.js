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
import { ItemEntity } from "../ItemEntity";
var RamRepairItem = /** @class */ (function (_super) {
    __extends(RamRepairItem, _super);
    function RamRepairItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RamRepairItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        playerStats.addHealth(10);
    };
    RamRepairItem.prototype.getSprite = function () {
        return Sprites.ramIcon;
    };
    RamRepairItem.prototype.getEffectSprite = function () {
        return Sprites.itemPlusIcon;
    };
    return RamRepairItem;
}(ItemEntity));
export { RamRepairItem };
//# sourceMappingURL=RamRepairItem.js.map