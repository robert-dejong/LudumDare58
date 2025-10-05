import { config } from "../Config";
import { Entity } from "./Entity";
import { MobEntity } from "./MobEntity";
import { VariableMobEntity } from "./VariableMobEntity";

export abstract class ProjectileEntity extends MobEntity {
    private readonly directionX: number;
    private readonly directionY: number;
    
    protected destroyOnCollide = true;

    private damage: number;

    constructor(x: number, y: number, directionX: number, directionY: number, speed: number, damage: number, speedModifier: number, damageModifier: number) {
        super(x, y);
        this.damage = damage * damageModifier;
        this.speed = speed * speedModifier;
        this.directionX = directionX;
        this.directionY = directionY;
        this.renderOrder = 9;
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

        if (this.destroyOnCollide) {
            this.removed = true;
        } else {
            this.damage *= 0.5;

            if (this.damage < 1) {
                this.removed = true;
            }
        }
    }
}