import { IScreen } from "../../../libs/Core/Screen/IScreen";
import { Sprite } from "../../../libs/Core/Screen/Sprite";
import { MobEntity } from "../MobEntity";

export abstract class VariableMobEntity extends MobEntity {
    
    protected abstract getOptions(): VariableMobOptions;

    public getSprite(): Sprite {
        return { loaded: true, width: this.getOptions().width, height: this.getOptions().height } as Sprite;
    }

    public override render(screen: IScreen): void {
        screen.renderRectangle(this.x, this.y, this.getSprite().width, this.getSprite().height, { color: '#f8f8f8', alpha: 0.6 });
        screen.renderText(this.getOptions().name, this.x + 2, this.y + 6, { fontColor: '#122285', fontSize: 5 })
    }
}

class VariableMobOptions {
    name: string;
    width: number;
    height?: number = 9;
}

export function createVariableMobOptions(options: VariableMobOptions) {
    return {...new VariableMobOptions(), ...options};
}