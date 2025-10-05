import { Unit } from "../../../libs/Core/Action/Unit";
var IncreasePointsAction = /** @class */ (function () {
    function IncreasePointsAction(points) {
        this.points = points;
    }
    return IncreasePointsAction;
}());
export { IncreasePointsAction };
var IncreasePointsActionHandler = /** @class */ (function () {
    function IncreasePointsActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    IncreasePointsActionHandler.prototype.handle = function (action) {
        this.playerStats.addPoints(action.points);
        return Unit.value;
    };
    return IncreasePointsActionHandler;
}());
export { IncreasePointsActionHandler };
//# sourceMappingURL=IncreasePoints.js.map