import { Sprite } from "../../libs/Core/Screen/Sprite";
import { Item } from "../Item/Item";
import { Entity } from "./Entity";

export class ItemEntity extends Entity {
    public readonly item: Item;

    constructor(item: Item, x: number, y: number) {
        super(x, y);
        this.item = item;
    }

    public override getSprite(): Sprite {
        return this.item.sprite;
    }

    public override canPass(): boolean {
        return true;
    }

    public override tick(): void {
        super.tick();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override onCollide(entity: Entity): void {

    }
}