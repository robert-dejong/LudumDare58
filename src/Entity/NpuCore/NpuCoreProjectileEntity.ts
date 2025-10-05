import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { ProjectileEntity } from "../ProjectileEntity";

export class NpuCoreProjectileEntity extends ProjectileEntity {
    constructor(x: number, y: number, directionX: number, directionY: number) {
        super(x, y, directionX, directionY, 0.9, 40, 1.0, 1.0);
        this.destroyOnCollide = false;
    }

    public override getSprite(): Sprite {
        return Sprites.npuProjectile;
    }
}