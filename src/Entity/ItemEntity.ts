import { IScreen } from "../../libs/Core/Screen/IScreen";
import { Sprites } from "../Sprites";
import { Entity } from "./Entity";
import { PlayerStats } from "./Player/PlayerStats";

type FloatingDirection = 'up' | 'down';

const despawnRateInTicks = 600;
const floatingDirectionTicks = 55;

export abstract class ItemEntity extends Entity {
    private ticksTillDespawn = despawnRateInTicks;

    private floatingDirection: FloatingDirection = 'up';
    private floatingOffsetTicks: number = 0;

    public abstract pickup(playerStats: PlayerStats): void;

    constructor(x: number, y: number) {
        super(x, y);
    }

    public override canPass(): boolean {
        return true;
    }

    public override tick(): void {
        super.tick();
        
        if (this.floatingDirection === 'up') {
            this.floatingOffsetTicks++;
        }

        if (this.floatingDirection === 'down') {
            this.floatingOffsetTicks--;
        }

        if (this.floatingOffsetTicks === floatingDirectionTicks) {
            this.floatingDirection = 'down';
        } else if(this.floatingOffsetTicks === 0) {
            this.floatingDirection = 'up';
        }

        this.ticksTillDespawn--;

        if (this.ticksTillDespawn === 0) {
            this.removed = true;
        }
    }

    public override render(screen: IScreen) {
        const offsetY = -(this.floatingOffsetTicks * 0.07);
        screen.render(this.getSprite(), this.x, this.y + offsetY);

        screen.render(Sprites.itemPlusIcon, this.x + this.getSprite().width, this.y + offsetY);
    }
}