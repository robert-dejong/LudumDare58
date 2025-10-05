import { createAnimation } from "./Animation";
var AnimationBuilder = /** @class */ (function () {
    function AnimationBuilder() {
        this.animations = new Map();
        this.cycleSpeed = 10;
    }
    AnimationBuilder.prototype.setCycleSpeed = function (cycleSpeed) {
        this.cycleSpeed = cycleSpeed;
        return this;
    };
    AnimationBuilder.prototype.add = function (direction, sprites) {
        this.animations.set(direction, sprites);
        return this;
    };
    AnimationBuilder.prototype.build = function () {
        return createAnimation(this.animations, this.cycleSpeed);
    };
    return AnimationBuilder;
}());
export { AnimationBuilder };
//# sourceMappingURL=AnimationBuilder.js.map