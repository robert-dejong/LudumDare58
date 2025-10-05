import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { Entity } from "../../Entity/Entity";
import { CpuThreadProjectileEntity } from "../../Entity/CpuThread/CpuThreadProjectileEntity";
import { NpuCoreProjectileEntity } from "../../Entity/NpuCore/NpuCoreProjectileEntity";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
import { PlayerStats } from "../../Entity/Player/PlayerStats";
import { WorkerEntity } from "../../Entity/WorkerEntity";
import { ILevel } from "../../Level/ILevel";
import { UpgradeType } from "../../Upgrades/UpgradeType";

export class WorkerFireProjectileAction implements IAction {
    constructor(public readonly worker: WorkerEntity) { }
}

export class WorkerFireProjectileActionHandler implements IActionHandler<WorkerFireProjectileAction> {

    constructor(
        private readonly level: ILevel, 
        private readonly playerStats: PlayerStats) { }

    public handle(action: WorkerFireProjectileAction): Unit {
        const level = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
        let attackDelay = action.worker.workerType === 'cpu' ? 
            action.worker.attackDelay - (level * 20) : 
            action.worker.attackDelay;

        if (attackDelay < 30) attackDelay = 30;

        if (action.worker.timeSinceLastAttack < attackDelay) {
            action.worker.timeSinceLastAttack++;
            return;
        }

        const target = this.findNearestEntity(action.worker);

        if (!target) return;
        
        const x = action.worker.x + (action.worker.getSprite().width / 2) - 1;
        const y = action.worker.y + (action.worker.getSprite().height / 2) - 1;

        const xOffset = target.x - action.worker.x;
        const yOffset = target.y - action.worker.y;
        const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        const directionX = xOffset / distance;
        const directionY = yOffset / distance;

        if (action.worker.workerType === 'cpu') {
            const cpuLevel = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
            const speedModifier = config.getCpuThreadSpeedModifier(cpuLevel);
            const damageModifier = config.getCpuThreadDamageModifier(cpuLevel);
            const projectile = new CpuThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier);
            this.level.add(projectile);
        } else if (action.worker.workerType === 'npu') {
            const projectile = new NpuCoreProjectileEntity(x, y, directionX, directionY);
            this.level.add(projectile);
        }
        
        action.worker.timeSinceLastAttack = 0;
    }

    private findNearestEntity(worker: WorkerEntity): VariableMobEntity {
        const entities = this.level.getEntities().filter(this.isVariableMobEntity);
     
        if (entities.length === 0) return undefined;

        let nearest = entities[0];
        let minDistance = Maths.getDistance(worker.x, worker.y, nearest.x, nearest.y);

        for(let i = 1; i < entities.length; i++) {
            const entity = entities[i];
            const distance = Maths.getDistance(worker.x, worker.y, entity.x, entity.y);

            if (distance < minDistance) {
                nearest = entity;
                minDistance = distance;
            }
        }

        return nearest;
    }

    private isVariableMobEntity(e: Entity): e is VariableMobEntity {
        return e.x <= (config.screenWidth / config.renderScale) && e instanceof VariableMobEntity;
    }
}