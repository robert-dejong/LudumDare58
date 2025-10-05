import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { ProjectileEntity } from "../ProjectileEntity";

export class NpuCoreProjectileEntity extends ProjectileEntity {
    constructor(x: number, y: number, directionX: number, directionY: number) {
        super(x, y, directionX, directionY, 0.8, 20, 1.0, 1.0);
    }

    public override getSprite(): Sprite {
        return Sprites.npuProjectile;
    }
}