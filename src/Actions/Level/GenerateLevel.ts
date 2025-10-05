import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionExecutor } from "../../../libs/Core/Action/IActionExecutor";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { config } from "../../Config";
import { CpuThreadMobEntity } from "../../Entity/CpuThread/CpuThreadMobEntity";
import { PrintMobEntity } from "../../Entity/Mobs/PrintMobEntity";
import { ILevel } from "../../Level/ILevel";
import { createLevel } from "../../Level/Level";

export class GenerateLevelAction implements IAction {
    constructor() { }
}

export class GenerateLevelActionHandler implements IActionHandler<GenerateLevelAction, ILevel> {
    
    constructor(
        private readonly actionExecutor: IActionExecutor) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle(action: GenerateLevelAction): ILevel {
        const level = createLevel(this.actionExecutor);

        const x = (config.screenWidth / config.renderScale) / 2;
        const y = config.BottomUiBarHeight / 2;
        const cpuThread = new CpuThreadMobEntity(x + config.leftUiBarWidth - 13, y - 6);
        level.add(cpuThread);

        const printEntity = new PrintMobEntity();
        printEntity.teleport(350, 60);
        level.add(printEntity);

        // level.add(new RamRepairItem(30, 77));

        return level;
    }
}