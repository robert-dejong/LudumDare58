import { RenderLevelAction } from "../Actions/Level/RenderLevel";
var Level = /** @class */ (function () {
    function Level(actionExecutor) {
        this.entities = new Array();
        this.actionExecutor = actionExecutor;
    }
    Level.prototype.tick = function () {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.tick();
        }
        this.entities = this.entities.filter(function (e) { return !e.removed; });
    };
    Level.prototype.render = function () {
        this.actionExecutor.execute(new RenderLevelAction());
    };
    Level.prototype.add = function (entity) {
        entity.onCreate(this.actionExecutor);
        this.entities.push(entity);
    };
    Level.prototype.getEntities = function () {
        return this.entities.filter(function (e) { return !e.removed; });
    };
    return Level;
}());
export var createLevel = function (actionExecutor) { return new Level(actionExecutor); };
//# sourceMappingURL=Level.js.map