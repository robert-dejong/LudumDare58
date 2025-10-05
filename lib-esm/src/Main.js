var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { KeyHandler } from '../libs/Core/Input/KeyHandler';
import { createScreen2D } from '../libs/Core/Screen/Screen';
import { config } from './Config';
import { keyBinds } from './Keybinds';
import { settings } from '../libs/Core/Settings/Settings';
import { createTaskManager } from '../libs/Core/Task/TaskManager';
import { createActionExecutor } from '../libs/Core/Action/ActionExecutor';
import { MoveMobEntityAction, MoveMobEntityActionHandler } from './Actions/Entity/MoveMobEntity';
import { RenderLevelAction, RenderLevelActionHandler } from './Actions/Level/RenderLevel';
import { createUIManager } from '../libs/Core/UI/UIManager';
import { MouseHandler } from '../libs/Core/Input/MouseHandler';
import { MouseClickAction, MouseClickActionHandler } from './Actions/MouseClickAction';
import { MouseMoveAction, MouseMoveActionHandler } from './Actions/MouseMovedAction';
import { MouseDragAction, MouseDragActionHandler } from './Actions/MouseDragAction';
import { GenerateLevelAction, GenerateLevelActionHandler } from './Actions/Level/GenerateLevel';
import { PlayerStats } from './Entity/Player/PlayerStats';
import { UITypes } from './UITypes';
import { BottomUi } from './UI/BottomUi';
import { EnemyWaveTask } from './Tasks/EnemyWaveTask';
import { DamageRamAction, DamageRamActionHandler } from './Actions/Entity/DamageRam';
import { BuyPlaceableAction, BuyPlaceableActionHandler } from './Actions/Upgrades/BuyPlaceableUpgrade';
import { WorkerFireProjectileAction, WorkerFireProjectileActionHandler } from './Actions/Entity/WorkerFireProjectile';
import { IncreasePointsAction, IncreasePointsActionHandler } from './Actions/Entity/IncreasePoints';
import { IncreaseScoreAction, IncreaseScoreActionHandler } from './Actions/Entity/IncreaseScoreAction';
import { PlayerActions } from './Entity/Player/PlayerActions';
import { UseBroomAction, UseBroomActionHandler } from './Actions/Player/UseBroomAction';
import { ItemSpawnTask } from './Tasks/ItemSpawnTask';
import { ClearLevelAction, ClearLevelActionHandler } from './Actions/Level/ClearLevel';
globalThis.settings = settings;
var Main = /** @class */ (function () {
    function Main() {
        this.lastFrameTimeMs = 0;
        this.timestep = 1000 / 60;
        this.delta = 0;
        this.frames = 0;
        this.last = new Date().getTime();
        this.ticks = 0;
        this.actionExecutor = createActionExecutor();
        this.playerStats = new PlayerStats();
        this.playerActions = new PlayerActions(this.actionExecutor);
        this.screen = createScreen2D(config.renderScale);
        this.taskManager = createTaskManager();
        this.uiManager = createUIManager();
        this.addUI();
        this.registerActions();
        this.addInputListeners();
        this.initialize();
        this.screen.setSize(config.screenWidth, config.screenHeight);
        this.run(0);
    }
    Main.prototype.initialize = function () {
        this.playerStats.initialize();
        this.level = this.actionExecutor.execute(new GenerateLevelAction());
        this.taskManager.clear();
        this.taskManager.add(new EnemyWaveTask(this.level, this.playerStats));
        this.taskManager.add(new ItemSpawnTask(this.level));
    };
    Main.prototype.registerActions = function () {
        var _this = this;
        this.actionExecutor.register(MoveMobEntityAction.name, function () { return new MoveMobEntityActionHandler(_this.level); });
        this.actionExecutor.register(DamageRamAction.name, function () { return new DamageRamActionHandler(_this.playerStats); });
        this.actionExecutor.register(RenderLevelAction.name, function () { return new RenderLevelActionHandler(_this.level, _this.screen); });
        this.actionExecutor.register(MouseClickAction.name, function () { return new MouseClickActionHandler(_this.uiManager, _this.playerActions, _this.playerStats); });
        this.actionExecutor.register(MouseMoveAction.name, function () { return new MouseMoveActionHandler(_this.uiManager); });
        this.actionExecutor.register(MouseDragAction.name, function () { return new MouseDragActionHandler(_this.uiManager); });
        this.actionExecutor.register(GenerateLevelAction.name, function () { return new GenerateLevelActionHandler(_this.actionExecutor); });
        this.actionExecutor.register(BuyPlaceableAction.name, function () { return new BuyPlaceableActionHandler(_this.playerStats, _this.level, _this.screen); });
        this.actionExecutor.register(WorkerFireProjectileAction.name, function () { return new WorkerFireProjectileActionHandler(_this.level, _this.playerStats); });
        this.actionExecutor.register(IncreasePointsAction.name, function () { return new IncreasePointsActionHandler(_this.playerStats); });
        this.actionExecutor.register(IncreaseScoreAction.name, function () { return new IncreaseScoreActionHandler(_this.playerStats); });
        this.actionExecutor.register(UseBroomAction.name, function () { return new UseBroomActionHandler(_this.level, _this.playerStats); });
        this.actionExecutor.register(ClearLevelAction.name, function () { return new ClearLevelActionHandler(_this.level); });
    };
    Main.prototype.addInputListeners = function () {
        var _this = this;
        KeyHandler.init(keyBinds);
        MouseHandler.bind('click', function (x, y) { return _this.actionExecutor.execute(new MouseClickAction(x, y)); });
        MouseHandler.bind('mousemove', function (x, y) { return _this.actionExecutor.execute(new MouseMoveAction(x, y)); });
        MouseHandler.bind('mousedrag', function (x, y) { return _this.actionExecutor.execute(new MouseDragAction(x, y)); });
    };
    Main.prototype.addUI = function () {
        this.uiManager.add(UITypes.Bottom, new BottomUi(this.playerStats, this.actionExecutor));
        this.uiManager.toggle(UITypes.Bottom);
    };
    Main.prototype.run = function (timestamp) {
        var _this = this;
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
        while (this.delta >= this.timestep) {
            this.delta -= this.timestep;
            this.ticks++;
            this.tick();
        }
        this.render();
        this.frames++;
        var current = new Date().getTime();
        if (current - this.last >= 3000) {
            this.last = current;
            console.log("Ticks: ".concat(this.ticks / 3, ", FPS: ").concat(this.frames / 3));
            this.frames = 0;
            this.ticks = 0;
        }
        requestAnimationFrame(function (timestamp) { return _this.run(timestamp); });
    };
    Main.prototype.tick = function () {
        if (settings.menu() !== 'game')
            return;
        if (keyBinds.pause.isPressed && !this.playerStats.isDied()) {
            keyBinds.pause.release();
            Main.paused = !Main.paused;
        }
        if (Main.paused)
            return;
        if (this.playerStats.isDied()) {
            if (keyBinds.restart.isPressed) {
                keyBinds.restart.release();
                this.initialize();
            }
            return;
        }
        this.playerActions.tick();
        this.level.tick();
        this.taskManager.tick();
        this.uiManager.tick();
    };
    Main.prototype.render = function () {
        if (settings.menu() !== 'game')
            return;
        this.level.render();
        this.playerActions.render(this.screen);
        this.uiManager.render(this.screen);
        if (this.playerStats.isDied()) {
            var textOptions = { fontSize: 6, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' };
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Memory overload!', 0, (this.screen.getSize().height / 2) - 23, __assign(__assign({}, textOptions), { fontSize: 9 }));
            this.screen.renderText("MB's cleaned: ".concat(this.playerStats.getScore()), 0, (this.screen.getSize().height / 2) - 12, __assign({}, textOptions));
            this.screen.renderText('Press Space to try again', 0, (this.screen.getSize().height / 2) - 1, __assign({}, textOptions));
            return;
        }
        if (Main.paused) {
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Game paused', 0, (this.screen.getSize().height / 2) - 9, { fontSize: 9, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' });
        }
    };
    Main.paused = false;
    return Main;
}());
export { Main };
new Main();
//# sourceMappingURL=Main.js.map