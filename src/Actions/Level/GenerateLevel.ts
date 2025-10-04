import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionExecutor } from "../../../libs/Core/Action/IActionExecutor";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { ItemEntity } from "../../Entity/ItemEntity";
import { TestEntity } from "../../Entity/Mobs/TestEntity";
import { TreeEntity } from "../../Entity/Objects/TreeEntity";
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
        level.add(new TestEntity(80, 20));
        level.add(new TestEntity(50, 50));
        level.add(new TestEntity(90, 90));

        level.add(new TreeEntity(150, 150));
        level.add(new TreeEntity(181, 138));

        level.add(new ItemEntity(new WoodItem(1), 30, 77));
        level.add(new ItemEntity(new WoodItem(1), 50, 77));

        return level;
    }
}