var Task = /** @class */ (function () {
    function Task(ticks, loop, name) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        this.shouldExecute = function () { return _this.ticks <= 0; };
        this.reset = function () { _this.ticks = _this.initialTicks; };
        this.tick = function () { _this.ticks--; };
        this.initialTicks = ticks;
        this.ticks = ticks;
        this.loop = loop;
        this.name = name;
    }
    Task.prototype.onCreate = function () {
    };
    return Task;
}());
export { Task };
//# sourceMappingURL=Task.js.map