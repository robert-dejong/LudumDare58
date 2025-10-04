import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { ObjectEntity } from "../ObjectEntity";

export class TreeEntity extends ObjectEntity {

    public getSprite(): Sprite {
        return Sprites.tree;
    }

    constructor(x: number, y: number) {
        super(x, y);
    }
}