var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = new Array();
    }
    TaskManager.prototype.tick = function () {
        var _this = this;
        this.tasks.forEach(function (task) {
            task.tick();
            if (!task.shouldExecute()) {
                return;
            }
            task.execute();
            task.reset();
            if (!task.loop) {
                _this.tasks = _this.tasks.filter(function (t) { return t !== task; });
            }
        });
    };
    TaskManager.prototype.remove = function (name) {
        this.tasks = this.tasks.filter(function (t) { return t.name !== name; });
    };
    TaskManager.prototype.add = function (task) {
        this.tasks.push(task);
        task.onCreate();
    };
    TaskManager.prototype.reset = function () {
        this.tasks.forEach(function (task) { return task.reset(); });
    };
    TaskManager.prototype.clear = function () {
        this.tasks = new Array();
    };
    return TaskManager;
}());
export var createTaskManager = function () { return new TaskManager(); };
//# sourceMappingURL=TaskManager.js.map