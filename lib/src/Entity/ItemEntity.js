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
import { Entity } from "./Entity";
var despawnRateInTicks = 900;
var floatingDirectionTicks = 55;
var ItemEntity = /** @class */ (function (_super) {
    __extends(ItemEntity, _super);
    function ItemEntity(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.ticksTillDespawn = despawnRateInTicks;
        _this.floatingDirection = 'up';
        _this.floatingOffsetTicks = 0;
        _this.renderOrder = 10;
        return _this;
    }
    ItemEntity.prototype.canPass = function () {
        return true;
    };
    ItemEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        if (this.floatingDirection === 'up') {
            this.floatingOffsetTicks++;
        }
        if (this.floatingDirection === 'down') {
            this.floatingOffsetTicks--;
        }
        if (this.floatingOffsetTicks === floatingDirectionTicks) {
            this.floatingDirection = 'down';
        }
        else if (this.floatingOffsetTicks === 0) {
            this.floatingDirection = 'up';
        }
        this.ticksTillDespawn--;
        if (this.ticksTillDespawn === 0) {
            this.removed = true;
        }
    };
    ItemEntity.prototype.render = function (screen) {
        var offsetY = -(this.floatingOffsetTicks * 0.07);
        screen.render(this.getSprite(), this.x, this.y + offsetY);
        screen.render(this.getEffectSprite(), this.x + this.getSprite().width, this.y + offsetY);
    };
    return ItemEntity;
}(Entity));
export { ItemEntity };
//# sourceMappingURL=ItemEntity.js.map