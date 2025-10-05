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
import { Directions } from "../../libs/Core/Util/Direction";
import { MoveMobEntityAction } from "../Actions/Entity/MoveMobEntity";
import { Entity } from "./Entity";
var MobEntity = /** @class */ (function (_super) {
    __extends(MobEntity, _super);
    function MobEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = Directions.down;
        _this.animationIndex = 0;
        _this.walkTime = 0;
        _this.speed = 1.0;
        return _this;
    }
    MobEntity.prototype.getSprite = function () {
        return this.animations ? this.animations.get(this.direction, this.animationIndex) : this.getSprite();
    };
    MobEntity.prototype.canPass = function () {
        return true;
    };
    MobEntity.prototype.teleport = function (x, y) {
        this.x = x;
        this.y = y;
    };
    MobEntity.prototype.move = function (moveX, moveY) {
        this.executeAction(new MoveMobEntityAction(this, moveX, moveY));
    };
    MobEntity.prototype.getSpeed = function () {
        return this.speed;
    };
    return MobEntity;
}(Entity));
export { MobEntity };
//# sourceMappingURL=MobEntity.js.map