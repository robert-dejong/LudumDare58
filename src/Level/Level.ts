import { IActionExecutor } from "../../libs/Core/Action/IActionExecutor";
import { RenderLevelAction } from "../Actions/Level/RenderLevel";
import { Entity } from "../Entity/Entity";
import { ILevel } from "./ILevel";

class Level implements ILevel {

    private readonly actionExecutor: IActionExecutor;

    private entities: Array<Entity>;
    
    constructor(actionExecutor: IActionExecutor) {
        this.entities = new Array<Entity>();
        this.actionExecutor = actionExecutor;
    }

    public tick(): void {
        for(const entity of this.entities) {
            entity.tick();
        }

        this.entities = this.entities.filter(e => !e.removed);
    }

    public render(): void {
        this.actionExecutor.execute(new RenderLevelAction());
    }

    public add(entity: Entity): void {
        entity.onCreate(this.actionExecutor);
        this.entities.push(entity);
    }

    public getEntities(): Array<Entity> {
        return this.entities.filter(e => !e.removed);
    }
}

export const createLevel = (actionExecutor: IActionExecutor) => new Level(actionExecutor);