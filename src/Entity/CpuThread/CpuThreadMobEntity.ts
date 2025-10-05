import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { Sprites } from "../../Sprites";
import { WorkerEntity } from "../WorkerEntity";

export class CpuThreadMobEntity extends WorkerEntity {
    constructor(x: number, y: number) {
        super(x, y, 'cpu', 300);
    }

    public override getSprite(): Sprite {
        return Sprites.cpuIcon;
    }
}