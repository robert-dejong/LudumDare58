var Entity = /** @class */ (function () {
    function Entity(x, y) {
        this.renderOrder = 0;
        this.x = x;
        this.y = y;
    }
    Entity.prototype.render = function (screen) {
        screen.render(this.getSprite(), this.x, this.y);
    };
    Entity.prototype.onCreate = function (actionExecutor) {
        this.actionExecutor = actionExecutor;
    };
    Entity.prototype.tick = function () {
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Entity.prototype.onCollide = function (entity) {
    };
    Entity.prototype.executeAction = function (action) {
        return this.actionExecutor.execute(action);
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map