import { IScreen } from '../libs/Core/Screen/IScreen';
import { KeyHandler } from '../libs/Core/Input/KeyHandler';
import { createScreen2D } from '../libs/Core/Screen/Screen';
import { config } from './Config';
import { keyBinds } from './Keybinds';
import { ILevel } from './Level/ILevel';
import { settings } from '../libs/Core/Settings/Settings';
import { ITaskManager } from '../libs/Core/Task/ITaskManager';
import { createTaskManager } from '../libs/Core/Task/TaskManager';
import { IActionExecutor } from '../libs/Core/Action/IActionExecutor';
import { createActionExecutor } from '../libs/Core/Action/ActionExecutor';
import { MoveMobEntityAction, MoveMobEntityActionHandler } from './Actions/Entity/MoveMobEntity';
import { RenderLevelAction, RenderLevelActionHandler } from './Actions/Level/RenderLevel';
import { IUIManager } from '../libs/Core/UI/IUIManager';
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
import { RenderTextOptions } from '../libs/Core/Screen/RenderTextOptions';

globalThis.settings = settings;

export class Main {
    private readonly screen: IScreen;
    private level: ILevel;
    private readonly playerActions: PlayerActions;
    private readonly playerStats: PlayerStats;
    private readonly taskManager: ITaskManager;
    private readonly actionExecutor: IActionExecutor;
    private readonly uiManager: IUIManager;

    private lastFrameTimeMs = 0;
    private timestep = 1000 / 60;
    private delta = 0;
    private frames = 0;
    private last = new Date().getTime();
    private ticks = 0;

    public static paused = false;
    
    constructor() {
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

    private initialize(): void {
        this.playerStats.initialize();
        this.level = this.actionExecutor.execute<ILevel>(new GenerateLevelAction());
        this.taskManager.clear();
        this.taskManager.add(new EnemyWaveTask(this.level, this.playerStats));
        this.taskManager.add(new ItemSpawnTask(this.level));
    }

    private registerActions(): void {
        this.actionExecutor.register(MoveMobEntityAction.name, () => new MoveMobEntityActionHandler(this.level));
        this.actionExecutor.register(DamageRamAction.name, () => new DamageRamActionHandler(this.playerStats));
        this.actionExecutor.register(RenderLevelAction.name, () => new RenderLevelActionHandler(this.level, this.screen));
        this.actionExecutor.register(MouseClickAction.name, () => new MouseClickActionHandler(this.uiManager, this.playerActions, this.playerStats));
        this.actionExecutor.register(MouseMoveAction.name, () => new MouseMoveActionHandler(this.uiManager));
        this.actionExecutor.register(MouseDragAction.name, () => new MouseDragActionHandler(this.uiManager));
        this.actionExecutor.register(GenerateLevelAction.name, () => new GenerateLevelActionHandler(this.actionExecutor));
        this.actionExecutor.register(BuyPlaceableAction.name, () => new BuyPlaceableActionHandler(this.playerStats, this.level, this.screen));
        this.actionExecutor.register(WorkerFireProjectileAction.name, () => new WorkerFireProjectileActionHandler(this.level, this.playerStats));
        this.actionExecutor.register(IncreasePointsAction.name, () => new IncreasePointsActionHandler(this.playerStats));
        this.actionExecutor.register(IncreaseScoreAction.name, () => new IncreaseScoreActionHandler(this.playerStats));
        this.actionExecutor.register(UseBroomAction.name, () => new UseBroomActionHandler(this.level, this.playerStats));
        this.actionExecutor.register(ClearLevelAction.name, () => new ClearLevelActionHandler(this.level));
    }

    private addInputListeners(): void {
        KeyHandler.init(keyBinds);
        MouseHandler.bind('click', (x, y) => this.actionExecutor.execute(new MouseClickAction(x, y)));
        MouseHandler.bind('mousemove', (x, y) => this.actionExecutor.execute(new MouseMoveAction(x, y)));
        MouseHandler.bind('mousedrag', (x, y) => this.actionExecutor.execute(new MouseDragAction(x, y)));
    }

    private addUI(): void {
        this.uiManager.add(UITypes.Bottom, new BottomUi(this.playerStats, this.actionExecutor));
        this.uiManager.toggle(UITypes.Bottom);
    }
    
    private run(timestamp: number): void {
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
        
        while (this.delta >= this.timestep) {
            this.delta -= this.timestep;
            this.ticks++;
            this.tick();
        }
    
        this.render();
        this.frames++;
    
        const current = new Date().getTime();
        if (current - this.last >= 3000) {
            this.last = current;
            console.log(`Ticks: ${this.ticks / 3}, FPS: ${this.frames / 3}`);
            this.frames = 0;
            this.ticks = 0;
        }
    
        requestAnimationFrame((timestamp) => this.run(timestamp));
    }

    private tick(): void {
        if (settings.menu() !== 'game') return;

        if (keyBinds.pause.isPressed && !this.playerStats.isDied()) {
            keyBinds.pause.release();
            Main.paused = !Main.paused;
        }

        if (Main.paused) return;

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
    }

    private render(): void {
        if (settings.menu() !== 'game') return;
        
        this.level.render();
        this.playerActions.render(this.screen);
        this.uiManager.render(this.screen);

        if (this.playerStats.isDied()) {
            const textOptions: RenderTextOptions = { fontSize: 6, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' };
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Memory overload!', 0, (this.screen.getSize().height / 2) - 23, { ...textOptions, fontSize: 9 });
            this.screen.renderText(`MB's cleaned: ${this.playerStats.getScore()}`, 0, (this.screen.getSize().height / 2) - 12, { ...textOptions });
            this.screen.renderText('Press Space to try again', 0, (this.screen.getSize().height / 2) - 1, { ...textOptions });
            return;
        }

        if (Main.paused) {
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Game paused', 0, (this.screen.getSize().height / 2) - 9, { fontSize: 9, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' });
        }
    }
}

new Main();