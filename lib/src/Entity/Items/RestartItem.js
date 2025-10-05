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
import { ClearLevelAction } from "../../Actions/Level/ClearLevel";
import { Sprites } from "../../Sprites";
import { ItemEntity } from "../ItemEntity";
var RestartItem = /** @class */ (function (_super) {
    __extends(RestartItem, _super);
    function RestartItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RestartItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        this.executeAction(new ClearLevelAction());
    };
    RestartItem.prototype.getSprite = function () {
        return Sprites.restartIcon;
    };
    RestartItem.prototype.getEffectSprite = function () {
        return Sprites.itemPlusIcon;
    };
    return RestartItem;
}(ItemEntity));
export { RestartItem };
//# sourceMappingURL=RestartItem.js.map