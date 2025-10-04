import { Sprite } from "../Core/Screen/Sprite";
import { Directions } from "../Core/Util/Direction";

export interface IAnimation {
    get(direction: Directions, index: number): Sprite;
    isNextAnimation(animationTime: number): boolean;
    nextIndex(direction: Directions, index: number): number;
}