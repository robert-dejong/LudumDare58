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
import { Upgrades } from "../../Upgrades/Upgrades";
import { ItemEntity } from "../ItemEntity";
var CpuOverclockItem = /** @class */ (function (_super) {
    __extends(CpuOverclockItem, _super);
    function CpuOverclockItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CpuOverclockItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        playerStats.giveUpgrade(Upgrades.cpuOverclock);
    };
    CpuOverclockItem.prototype.getSprite = function () {
        return Sprites.overclockIcon;
    };
    CpuOverclockItem.prototype.getEffectSprite = function () {
        return Sprites.itemUpgradeIcon;
    };
    return CpuOverclockItem;
}(ItemEntity));
export { CpuOverclockItem };
//# sourceMappingURL=CpuOverclockItem.js.map