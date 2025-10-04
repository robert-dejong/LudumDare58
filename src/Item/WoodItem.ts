import { Sprites } from "../Sprites";
import { Item } from "./Item";

export class WoodItem extends Item {
    constructor(amount = 1) {
        super('Wood', Sprites.wood, amount, false);
    }
}