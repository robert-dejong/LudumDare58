import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionExecutor } from "../../../libs/Core/Action/IActionExecutor";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { RamRepairItem } from "../../Entity/Items/RamRepairItem";
import { ForLoopMobEntity } from "../../Entity/Mobs/ForLoopMobEntity";
import { NodeModulesMobEntity } from "../../Entity/Mobs/NodeModulesMobEntity";
import { ILevel } from "../../Level/ILevel";
import { createLevel } from "../../Level/Level";

export class GenerateLevelAction implements IAction {
    constructor(
        public readonly width: number,
        public readonly height: number) { }
}

export class GenerateLevelActionHandler implements IActionHandler<GenerateLevelAction, ILevel> {
    
    constructor(
        private readonly actionExecutor: IActionExecutor) { }

    public handle(action: GenerateLevelAction): ILevel {
        const level = createLevel(action.width, action.height, this.actionExecutor);

        const entity1 = new NodeModulesMobEntity();
        entity1.teleport(200, 30);
        level.add(entity1);

        const entity2 = new ForLoopMobEntity();
        entity2.teleport(200, 60);
        level.add(entity2);

        level.add(new RamRepairItem(30, 77));

        return level;
    }
}