import { WorkerFireProjectileAction } from "../Actions/Entity/WorkerFireProjectile";
import { MobEntity } from "./MobEntity";

export abstract class WorkerEntity extends MobEntity {
    public timeSinceLastAttack = 0;
    public workerType: WorkerType;
    public attackDelay: number;

    constructor(x: number, y: number, workerType: WorkerType, attackDelay: number) {
        super(x, y);
        this.speed = 0;
        this.workerType = workerType;
        this.attackDelay = attackDelay;
    }

    public override tick() {
        super.tick();

        this.executeAction(new WorkerFireProjectileAction(this));
    }
}

export type WorkerType = 'cpu' | 'npu';