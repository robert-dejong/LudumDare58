import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionExecutor } from "../../../libs/Core/Action/IActionExecutor";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { ItemEntity } from "../../Entity/ItemEntity";
import { NodeModulesMobEntity } from "../../Entity/Mobs/NodeModulesMobEntity";
import { Player } from "../../Entity/Player/Player";
import { WoodItem } from "../../Item/WoodItem";
import { ILevel } from "../../Level/ILevel";
import { createLevel } from "../../Level/Level";

export class GenerateLevelAction implements IAction {
    constructor(
        public readonly width: number,
        public readonly height: number) { }
}

export class GenerateLevelActionHandler implements IActionHandler<GenerateLevelAction, ILevel> {
    
    constructor(
        private readonly actionExecutor: IActionExecutor,
        private readonly player: Player) { }

    public handle(action: GenerateLevelAction): ILevel {
        const level = createLevel(action.width, action.height, this.actionExecutor);

        level.add(this.player);

        const entity1 = new NodeModulesMobEntity();
        entity1.teleport(100, 100);
        level.add(entity1)

        level.add(new ItemEntity(new WoodItem(1), 30, 77));
        level.add(new ItemEntity(new WoodItem(1), 50, 77));

        return level;
    }
}