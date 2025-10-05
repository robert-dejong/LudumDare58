import { Unit } from "../../../libs/Core/Action/Unit";
var IncreaseScoreAction = /** @class */ (function () {
    function IncreaseScoreAction(score) {
        this.score = score;
    }
    return IncreaseScoreAction;
}());
export { IncreaseScoreAction };
var IncreaseScoreActionHandler = /** @class */ (function () {
    function IncreaseScoreActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    IncreaseScoreActionHandler.prototype.handle = function (action) {
        this.playerStats.addScore(action.score);
        return Unit.value;
    };
    return IncreaseScoreActionHandler;
}());
export { IncreaseScoreActionHandler };
//# sourceMappingURL=IncreaseScoreAction.js.map