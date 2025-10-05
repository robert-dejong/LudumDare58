import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { ThreadFireProjectileAction } from "../../Actions/Entity/ThreadFireProjectile";
import { Sprites } from "../../Sprites";
import { MobEntity } from "../MobEntity";

export class ThreadMobEntity extends MobEntity {
    public timeSinceLastAttack = 0;

    constructor(x: number, y: number) {
        super(x, y);
        this.speed = 0;
    }

    public override tick() {
        super.tick();

        this.executeAction(new ThreadFireProjectileAction(this));
    }

    public getSprite(): Sprite {
        return Sprites.threadsIcon;
    }
}