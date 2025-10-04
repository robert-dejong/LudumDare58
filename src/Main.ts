import { IScreen } from '../libs/Core/Screen/IScreen';
import { KeyHandler } from '../libs/Core/Input/KeyHandler';
import { createScreen2D } from '../libs/Core/Screen/Screen';
import { config } from './Config';
import { Player } from './Entity/Player/Player';
import { keyBinds } from './Keybinds';
import { ILevel } from './Level/ILevel';
import { settings } from '../libs/Core/Settings/Settings';
import { ITaskManager } from '../libs/Core/Task/ITaskManager';
import { createTaskManager } from '../libs/Core/Task/TaskManager';
import { TestTask } from './Tasks/TestTask';
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

globalThis.settings = settings;

export class Main {
    private readonly screen: IScreen;
    private readonly level: ILevel;
    private readonly player: Player;
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
    
    constructor() {
        this.actionExecutor = createActionExecutor();
        this.player = new Player();
        this.playerStats = new PlayerStats();
        this.screen = createScreen2D(config.renderScale);
        this.taskManager = createTaskManager();
        this.uiManager = createUIManager();

        this.addUI();
        this.registerActions();
        this.addInputListeners();

        this.initialize();

        this.level = this.actionExecutor.execute<ILevel>(new GenerateLevelAction(128, 128));

        this.taskManager.add(new TestTask(120));

        this.screen.setSize(config.screenWidth, config.screenHeight);

        this.run(0);
    }

    private initialize(): void {
        this.playerStats.initialize();
    }

    private registerActions(): void {
        this.actionExecutor.register(MoveMobEntityAction.name, () => new MoveMobEntityActionHandler(this.level));
        this.actionExecutor.register(RenderLevelAction.name, () => new RenderLevelActionHandler(this.level, this.screen));
        this.actionExecutor.register(MouseClickAction.name, () => new MouseClickActionHandler(this.uiManager));
        this.actionExecutor.register(MouseMoveAction.name, () => new MouseMoveActionHandler(this.uiManager));
        this.actionExecutor.register(MouseDragAction.name, () => new MouseDragActionHandler(this.uiManager));
        this.actionExecutor.register(GenerateLevelAction.name, () => new GenerateLevelActionHandler(this.actionExecutor, this.player));
    }

    private addInputListeners(): void {
        KeyHandler.init(keyBinds);
        MouseHandler.bind('click', (x, y) => this.actionExecutor.execute(new MouseClickAction(x, y)));
        MouseHandler.bind('mousemove', (x, y) => this.actionExecutor.execute(new MouseMoveAction(x, y)));
        MouseHandler.bind('mousedrag', (x, y) => this.actionExecutor.execute(new MouseDragAction(x, y)));
    }

    private addUI(): void {
        this.uiManager.add(UITypes.Bottom, new BottomUi(this.playerStats));
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

        this.level.tick();
        this.taskManager.tick();
        this.uiManager.tick();
    }

    private render(): void {
        if (settings.menu() !== 'game') return;
        
        this.level.render();
        this.uiManager.render(this.screen);
    }
}

new Main();