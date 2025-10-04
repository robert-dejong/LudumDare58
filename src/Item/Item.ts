import { Sprite } from "../../libs/Core/Screen/Sprite";

export abstract class Item {
    public readonly name: string;
    public readonly sprite: Sprite;
    public readonly stacks: boolean;

    private amount: number;

    constructor(name: string, sprite: Sprite, amount: number, stacks: boolean) {
        this.name = name;
        this.sprite = sprite;
        this.stacks = stacks;
        this.amount = amount;
    }

    public add(amount: number): boolean {
        if (!this.stacks) return false;

        this.amount += amount;
        return true;
    }

    public remove(amount = 1): void {
        this.amount -= amount;
    }

    public getAmount(): number {
        return this.amount;
    }
}