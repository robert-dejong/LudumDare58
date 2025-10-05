var Direction = /** @class */ (function () {
    function Direction() {
    }
    Direction.get = function (x, y) {
        if (y < 0)
            return Directions.up;
        if (y > 0)
            return Directions.down;
        if (x < 0)
            return Directions.left;
        if (x > 0)
            return Directions.right;
        throw new Error("Could not get direction for ".concat(x, ", ").concat(y));
    };
    return Direction;
}());
export { Direction };
export var Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["down"] = 1] = "down";
    Directions[Directions["left"] = 2] = "left";
    Directions[Directions["right"] = 3] = "right";
})(Directions || (Directions = {}));
//# sourceMappingURL=Direction.js.map