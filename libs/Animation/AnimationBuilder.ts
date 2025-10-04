import { Sprite } from "../Core/Screen/Sprite";
import { Directions } from "../Core/Util/Direction";
import { createAnimation } from "./Animation";
import { IAnimation } from "./IAnimation";

export class AnimationBuilder {
    private animations: Map<Directions, Array<Sprite>>;
    private cycleSpeed: number;

    constructor() {
        this.animations = new Map<Directions, Array<Sprite>>();
        this.cycleSpeed = 10;
    }

    public setCycleSpeed(cycleSpeed: number): AnimationBuilder {
        this.cycleSpeed = cycleSpeed;
        return this;
    }

    public add(direction: Directions, sprites: Array<Sprite>): AnimationBuilder {
        this.animations.set(direction, sprites);
        return this;
    }

    public build(): IAnimation {
        return createAnimation(this.animations, this.cycleSpeed);
    }
}