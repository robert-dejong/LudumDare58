import { IAnimation } from "../../libs/Animation/IAnimation";
import { Sprite } from "../../libs/Core/Screen/Sprite";
import { Directions } from "../../libs/Core/Util/Direction";
import { MoveMobEntityAction } from "../Actions/Entity/MoveMobEntity";
import { Entity } from "./Entity";

export abstract class MobEntity extends Entity {
    public direction = Directions.down;
    public animationIndex = 0;
    public walkTime = 0;
    public animations: IAnimation;

    protected speed = 1.0;
    
    public override getSprite(): Sprite {
        return this.animations ? this.animations.get(this.direction, this.animationIndex) : this.getSprite();
    }

    public override canPass(): boolean {
        return true;
    }

    public teleport(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    protected move(moveX: number, moveY: number): void {
        this.executeAction(new MoveMobEntityAction(this, moveX, moveY));
    }

    public getSpeed() {
        return this.speed;
    }
}