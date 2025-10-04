
import { Sprite } from "../Core/Screen/Sprite";
import { Directions } from "../Core/Util/Direction";
import { IAnimation } from "./IAnimation";

class Animation implements IAnimation {
    private readonly animations: Map<Directions, Sprite[]>;
    private readonly cycleSpeed: number;

    constructor(animations: Map<Directions, Array<Sprite>>, cycleSpeed: number) {
        this.animations = animations;
        this.cycleSpeed = cycleSpeed;
    }

    public get(direction: Directions, index: number) {
        if (!this.animations.has(direction)) throw new Error("No animation found");
        
        const sprites = this.animations.get(direction);

        if (index >= sprites.length) throw new Error("Animation index overflow");

        return sprites[index];
    }

    public isNextAnimation(animationTime: number): boolean {
        return animationTime >= this.cycleSpeed;
    }

    public nextIndex(direction: Directions, index: number): number {
        if (!this.animations.has(direction)) throw new Error("No animation found");
        
        const sprites = this.animations.get(direction);

        if (index >= sprites.length - 1) return 0;

        return index + 1;
    }
}

export const createAnimation = (animations: Map<Directions, Array<Sprite>>, cycleSpeed: number) => new Animation(animations, cycleSpeed);