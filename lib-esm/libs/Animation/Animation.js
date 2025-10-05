var Animation = /** @class */ (function () {
    function Animation(animations, cycleSpeed) {
        this.animations = animations;
        this.cycleSpeed = cycleSpeed;
    }
    Animation.prototype.get = function (direction, index) {
        if (!this.animations.has(direction))
            throw new Error("No animation found");
        var sprites = this.animations.get(direction);
        if (index >= sprites.length)
            throw new Error("Animation index overflow");
        return sprites[index];
    };
    Animation.prototype.isNextAnimation = function (animationTime) {
        return animationTime >= this.cycleSpeed;
    };
    Animation.prototype.nextIndex = function (direction, index) {
        if (!this.animations.has(direction))
            throw new Error("No animation found");
        var sprites = this.animations.get(direction);
        if (index >= sprites.length - 1)
            return 0;
        return index + 1;
    };
    return Animation;
}());
export var createAnimation = function (animations, cycleSpeed) { return new Animation(animations, cycleSpeed); };
//# sourceMappingURL=Animation.js.map