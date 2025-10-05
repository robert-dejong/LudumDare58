import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { IScreen } from "../../../libs/Core/Screen/IScreen";
import { config } from "../../Config";
import { ILevel } from "../../Level/ILevel";
import { Sprites } from "../../Sprites";

export class RenderLevelAction implements IAction { }

export class RenderLevelActionHandler implements IActionHandler<RenderLevelAction> {
    
    constructor(
        private readonly level: ILevel,
        private readonly screen: IScreen) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle(_action: RenderLevelAction): Unit {
        const { width, height } = this.screen.getSize();
        this.screen.renderRectangle(0, 0, width, height, { color: '#37946e' });
        this.renderLeftUiBar();
        this.renderEntities();

        return Unit.value;
    }

    private renderLeftUiBar(): void {
        const { height } = this.screen.getSize();
        const imageHeight = Sprites.ram.height;
        const topMargin = 15;
        const bottomMargin = 15;
        const leftMargin = 2;
        const imageCount = 4;

        const usableHeight = config.BottomUiBarHeight - topMargin - bottomMargin - imageHeight;
        const spacing = usableHeight / (imageCount - 1);

        const lineMarginX = Sprites.ram.width + 2 + leftMargin;
        const lineWidth = 4;

        this.screen.renderRectangle(0, 0, config.leftUiBarWidth, height, { color: '#2a5644' });

        for (let i = 0; i < imageCount; i++) {
            const y = topMargin + i * spacing;
            this.screen.render(Sprites.ram, leftMargin, y);

            const lineHeight = y + (Sprites.ram.height / 2);
            this.screen.renderLine(lineMarginX, lineHeight, lineMarginX + lineWidth, lineHeight, 0.5, '#ffffff');
        }

        this.screen.renderLine(lineMarginX + lineWidth, 0, lineMarginX + lineWidth, config.BottomUiBarHeight, 0.5, '#ffffff');
    }

    private renderEntities(): void {
        const entities = this.level.getEntities();

        for(const entity of entities) {
            entity.render(this.screen)
        }
    }
}