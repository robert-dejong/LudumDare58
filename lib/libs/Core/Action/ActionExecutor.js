var ActionExecutor = /** @class */ (function () {
    function ActionExecutor() {
        this.handlers = new Map;
    }
    ActionExecutor.prototype.register = function (action, handler) {
        this.handlers.set(action, handler);
    };
    ActionExecutor.prototype.execute = function (action) {
        if (!this.handlers.has(action.constructor.name)) {
            throw new Error("Could not find handler for action '".concat(action.constructor.name, "'"));
        }
        var handler = this.handlers.get(action.constructor.name);
        return handler().handle(action);
    };
    return ActionExecutor;
}());
export var createActionExecutor = function () { return new ActionExecutor(); };
//# sourceMappingURL=ActionExecutor.js.map