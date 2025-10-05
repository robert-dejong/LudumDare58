var Maths = /** @class */ (function () {
    function Maths() {
    }
    Maths.intersects = function (x1, y1, width1, height1, x2, y2, width2, height2) {
        return (x1 + width1 >= x2 && x1 <= x2 + width2) &&
            (y1 + height1 >= y2 && y1 <= y2 + height2);
    };
    Maths.getDistance = function (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return Maths;
}());
export { Maths };
//# sourceMappingURL=Maths.js.map