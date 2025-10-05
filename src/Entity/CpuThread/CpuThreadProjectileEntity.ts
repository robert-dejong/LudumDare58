import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { ProjectileEntity } from "../ProjectileEntity";

export class CpuThreadProjectileEntity extends ProjectileEntity {
    constructor(x: number, y: number, directionX: number, directionY: number, speedModifier: number, damageModifier: number) {
        super(x, y, directionX, directionY, 0.6, 1, speedModifier, damageModifier);
    }

    public override getSprite(): Sprite {
        return Sprites.cpuProjectile;
    }
}