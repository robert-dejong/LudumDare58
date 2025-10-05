import { IScreen } from "../../libs/Core/Screen/IScreen";
import { Sprite } from "../../libs/Core/Screen/Sprite";
import { DamageRamAction } from "../Actions/Entity/DamageRam";
import { IncreasePointsAction } from "../Actions/Entity/IncreasePoints";
import { IncreaseScoreAction } from "../Actions/Entity/IncreaseScoreAction";
import { config } from "../Config";
import { MobEntity } from "./MobEntity";

export abstract class VariableMobEntity extends MobEntity {
    private readonly options: VariableMobOptions;
    private maxHealth: number;
    private health: number;

    private readonly healthBarWidth = 15;

    constructor(options: VariableMobOptions) {
        super(0, 0);
        this.options = options;
        this.speed = options.speed;
        this.maxHealth = options.health;
        this.health = options.health;
    }

    public getSprite(): Sprite {
        return { loaded: true, width: this.options.width, height: this.options.height } as Sprite;
    }

    public override tick(): void {
        super.tick();

        this.move(-this.speed, 0);

        if (this.x <= config.leftUiBarWidth) {
            this.executeAction(new DamageRamAction(this.options.damage));
            this.removed = true;
            return;
        }
    }

    public override render(screen: IScreen): void {
        screen.renderRectangle(this.x, this.y, this.getSprite().width, this.getSprite().height, { color: '#f8f8f8', alpha: 0.6 });
        screen.renderText(this.options.name, this.x + 2, this.y + (this.getSprite().height / 2) + 1, { fontColor: '#122285', fontSize: 5 })

        const healthSize = (this.healthBarWidth / this.maxHealth) * this.health;
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, this.healthBarWidth, 1, { color: 'red' });
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, healthSize, 1, { color: 'green' });
    }

    public dealDamage(amount: number) {
        this.health -= amount;

        if (this.health <= 0) {
            this.removed = true;
            this.executeAction(new IncreasePointsAction(this.options.points));
            this.executeAction(new IncreaseScoreAction(this.options.damage));
        }
    }
}

export interface VariableMobOptions {
    name: string;
    width: number;
    height: number;
    speed: number;
    damage: number;
    health: number;
    points: number;
}