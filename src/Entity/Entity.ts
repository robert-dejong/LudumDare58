import { IAction } from "../../libs/Core/Action/IAction";
import { IActionExecutor } from "../../libs/Core/Action/IActionExecutor";
import { IScreen } from "../../libs/Core/Screen/IScreen";
import { Sprite } from "../../libs/Core/Screen/Sprite";

export abstract class Entity {
    public x: number;
    public y: number;
    public removed: boolean;

    private actionExecutor: IActionExecutor;

    public abstract getSprite(): Sprite;
    public abstract canPass(): boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public render(screen: IScreen): void {
        screen.render(this.getSprite(), this.x, this.y);
    }

    public onCreate(actionExecutor: IActionExecutor): void {
        this.actionExecutor = actionExecutor;
    }

    public tick(): void {
        
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public onCollide(entity: Entity): void {

    }

    protected executeAction<T>(action: IAction): T {
        return this.actionExecutor.execute(action);
    }
}