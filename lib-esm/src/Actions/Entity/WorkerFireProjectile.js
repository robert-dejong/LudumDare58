import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { CpuThreadProjectileEntity } from "../../Entity/CpuThread/CpuThreadProjectileEntity";
import { NpuCoreProjectileEntity } from "../../Entity/NpuCore/NpuCoreProjectileEntity";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
import { UpgradeType } from "../../Upgrades/UpgradeType";
var WorkerFireProjectileAction = /** @class */ (function () {
    function WorkerFireProjectileAction(worker) {
        this.worker = worker;
    }
    return WorkerFireProjectileAction;
}());
export { WorkerFireProjectileAction };
var WorkerFireProjectileActionHandler = /** @class */ (function () {
    function WorkerFireProjectileActionHandler(level, playerStats) {
        this.level = level;
        this.playerStats = playerStats;
    }
    WorkerFireProjectileActionHandler.prototype.handle = function (action) {
        var level = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
        var attackDelay = action.worker.workerType === 'cpu' ?
            action.worker.attackDelay - (level * 20) :
            action.worker.attackDelay;
        if (attackDelay < 10)
            attackDelay = 10;
        if (action.worker.timeSinceLastAttack < attackDelay) {
            action.worker.timeSinceLastAttack++;
            return;
        }
        var target = this.findNearestEntity(action.worker);
        if (!target)
            return;
        var x = action.worker.x + (action.worker.getSprite().width / 2) - 1;
        var y = action.worker.y + (action.worker.getSprite().height / 2) - 1;
        var xOffset = target.x - action.worker.x;
        var yOffset = target.y - action.worker.y;
        var distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        var directionX = xOffset / distance;
        var directionY = yOffset / distance;
        if (action.worker.workerType === 'cpu') {
            var cpuLevel = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
            var speedModifier = config.getCpuThreadModifier(cpuLevel);
            var damageModifier = config.getCpuThreadModifier(cpuLevel);
            var projectile = new CpuThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier);
            this.level.add(projectile);
        }
        else if (action.worker.workerType === 'npu') {
            var projectile = new NpuCoreProjectileEntity(x, y, directionX, directionY);
            this.level.add(projectile);
        }
        action.worker.timeSinceLastAttack = 0;
    };
    WorkerFireProjectileActionHandler.prototype.findNearestEntity = function (worker) {
        var entities = this.level.getEntities().filter(this.isVariableMobEntity);
        if (entities.length === 0)
            return undefined;
        var nearest = entities[0];
        var minDistance = Maths.getDistance(worker.x, worker.y, nearest.x, nearest.y);
        for (var i = 1; i < entities.length; i++) {
            var entity = entities[i];
            var distance = Maths.getDistance(worker.x, worker.y, entity.x, entity.y);
            if (distance < minDistance) {
                nearest = entity;
                minDistance = distance;
            }
        }
        return nearest;
    };
    WorkerFireProjectileActionHandler.prototype.isVariableMobEntity = function (e) {
        return e.x <= (config.screenWidth / config.renderScale) && e instanceof VariableMobEntity;
    };
    return WorkerFireProjectileActionHandler;
}());
export { WorkerFireProjectileActionHandler };
//# sourceMappingURL=WorkerFireProjectile.js.map