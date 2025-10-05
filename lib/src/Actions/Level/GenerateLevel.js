import { config } from "../../Config";
import { CpuThreadMobEntity } from "../../Entity/CpuThread/CpuThreadMobEntity";
import { PrintMobEntity } from "../../Entity/Mobs/PrintMobEntity";
import { createLevel } from "../../Level/Level";
var GenerateLevelAction = /** @class */ (function () {
    function GenerateLevelAction() {
    }
    return GenerateLevelAction;
}());
export { GenerateLevelAction };
var GenerateLevelActionHandler = /** @class */ (function () {
    function GenerateLevelActionHandler(actionExecutor) {
        this.actionExecutor = actionExecutor;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GenerateLevelActionHandler.prototype.handle = function (action) {
        var level = createLevel(this.actionExecutor);
        var x = (config.screenWidth / config.renderScale) / 2;
        var y = config.BottomUiBarHeight / 2;
        var cpuThread = new CpuThreadMobEntity(x + config.leftUiBarWidth - 13, y - 6);
        level.add(cpuThread);
        var printEntity = new PrintMobEntity();
        printEntity.teleport(350, 60);
        level.add(printEntity);
        // level.add(new RamRepairItem(30, 77));
        return level;
    };
    return GenerateLevelActionHandler;
}());
export { GenerateLevelActionHandler };
//# sourceMappingURL=GenerateLevel.js.map