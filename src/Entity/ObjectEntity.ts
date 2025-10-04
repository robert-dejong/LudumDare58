import { Entity } from "./Entity";

export abstract class ObjectEntity extends Entity {

    public override canPass(): boolean {
        return false;
    }
}