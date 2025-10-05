import { config } from "../Config";
import { Entity } from "./Entity";
import { MobEntity } from "./MobEntity";
import { VariableMobEntity } from "./VariableMobEntity";

export abstract class ProjectileEntity extends MobEntity {
    private readonly directionX: number;
    private readonly directionY: number;
    
    private damage: number;

    constructor(x: number, y: number, directionX: number, directionY: number, speed: number, damage: number, speedModifier: number, damageModifier: number) {
        super(x, y);
        this.damage = damage * damageModifier;
        this.speed = speed * speedModifier;
        this.directionX = directionX;
        this.directionY = directionY;
    }

    public override tick() {
        super.tick();

        const moveX = this.directionX * this.speed;
        const moveY = this.directionY * this.speed;

        this.move(moveX, moveY);

        const screenWidth = (config.screenWidth / config.renderScale);
        if (this.x < config.leftUiBarWidth || this.x > screenWidth || this.y < 0 || this.y > config.BottomUiBarHeight) {
            this.removed = true;
        }
    }

    public override onCollide(entity: Entity): void {
        if (!(entity instanceof VariableMobEntity)) return;

        const variableMobEntity = entity as VariableMobEntity;

        variableMobEntity.dealDamage(this.damage);
        this.removed = true;
    }
}