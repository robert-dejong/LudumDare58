import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { Maths } from "../../../libs/Core/Util/Maths";
import { config } from "../../Config";
import { Entity } from "../../Entity/Entity";
import { ThreadMobEntity } from "../../Entity/Mobs/ThreadMobEntity";
import { ThreadProjectileEntity } from "../../Entity/Mobs/ThreadProjectileEntity";
import { VariableMobEntity } from "../../Entity/Mobs/VariableMobEntity";
import { PlayerStats } from "../../Entity/Player/PlayerStats";
import { ILevel } from "../../Level/ILevel";
import { UpgradeType } from "../../Upgrades/UpgradeType";

export class ThreadFireProjectileAction implements IAction {
    constructor(public readonly thread: ThreadMobEntity) { }
}

export class ThreadFireProjectileActionHandler implements IActionHandler<ThreadFireProjectileAction> {

    constructor(
        private readonly level: ILevel, 
        private readonly playerStats: PlayerStats) { }

    public handle(action: ThreadFireProjectileAction): Unit {
        const level = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
        let attackDelay = 300 - (level * 20);

        if (attackDelay < 30) attackDelay = 30;

        if (action.thread.timeSinceLastAttack < attackDelay) {
            action.thread.timeSinceLastAttack++;
            return;
        }

        const target = this.findNearestEntity(action.thread);

        if (!target) return;
        
        const x = action.thread.x + (action.thread.getSprite().width / 2);
        const y = action.thread.y + (action.thread.getSprite().height / 2);

        const xOffset = target.x - action.thread.x;
        const yOffset = target.y - action.thread.y;
        const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        const directionX = xOffset / distance;
        const directionY = yOffset / distance;

        const cpuLevel = this.playerStats.getUpgradeLevel(UpgradeType.CpuOverclock);
        const speedModifier = config.getThreadSpeedModifier(cpuLevel);
        const damageModifier = config.getThreadDamageModifier(cpuLevel);
        const projectile = new ThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier);
        this.level.add(projectile);
        action.thread.timeSinceLastAttack = 0;

        console.log('Shooting at target at', target.x, target.y);
    }

    private findNearestEntity(thread: ThreadMobEntity): VariableMobEntity {
        const entities = this.level.getEntities().filter(this.isVariableMobEntity);
     
        if (entities.length === 0) return undefined;

        let nearest = entities[0];
        let minDistance = Maths.getDistance(thread.x, thread.y, nearest.x, nearest.y);

        for(let i = 1; i < entities.length; i++) {
            const entity = entities[i];
            const distance = Maths.getDistance(thread.x, thread.y, entity.x, entity.y);

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