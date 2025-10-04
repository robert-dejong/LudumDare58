import { IScreen } from "../../libs/Core/Screen/IScreen";
import { RenderTextOptions } from "../../libs/Core/Screen/RenderTextOptions";
import { UI } from "../../libs/Core/UI/UI";
import { Maths } from "../../libs/Core/Util/Maths";
import { config } from "../Config";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { Upgrade } from "../Upgrades/Upgrade";
import { Upgrades } from "../Upgrades/Upgrades";

export class BottomUi extends UI {
    private selectedUpgrade: Upgrade;

    private readonly upgradeOffsetX = 20;

    constructor(private readonly playerStats: PlayerStats) {
        super();
    }

    public override getPosition(): { x: number; y: number; width: number; height: number; } {
        return { x: 0, y: config.BottomUiBarHeight, width: config.screenWidth, height: config.screenHeight - config.BottomUiBarHeight };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override render(screen: IScreen): void {
        const { width, height } = screen.getSize();
        const textOptions: RenderTextOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };
        screen.renderRectangle(0, config.BottomUiBarHeight, width, height - config.BottomUiBarHeight, { color: '#000000' });
        screen.renderLine(0, config.BottomUiBarHeight, width, config.BottomUiBarHeight, 0.5, '#ffffff');

        // Health bar
        screen.renderRectangle(2.5, config.BottomUiBarHeight + 9.5, 71, 11, { color: '#ffffff' });
        screen.renderRectangle(3, config.BottomUiBarHeight + 10, 70, 10, { color: 'red' });
        
        const healthWidth = (70 / this.playerStats.getMaxHealth()) * this.playerStats.getHealth();
        screen.renderRectangle(3, config.BottomUiBarHeight + 10, healthWidth, 10, { color: 'green' });

        screen.renderText('Unused memory', 23, config.BottomUiBarHeight + 16.3, textOptions);

        // Score
        screen.renderText(`KB cleaned: ${this.playerStats.getScore()}`, 2, config.BottomUiBarHeight + 5, textOptions);
        
        // Divider
        screen.renderLine(76, config.BottomUiBarHeight, 76, height, 0.5, '#ffffff');

        // Upgrades
        screen.renderText(`Upgrades (points: ${this.playerStats.getPoints()})`, 79, config.BottomUiBarHeight + 5, textOptions);

        Upgrades.getUpgrades().forEach((upgrade, index) => {
            const xOffset = this.upgradeOffsetX * index;
            screen.renderRectangle(79 + xOffset, config.BottomUiBarHeight + 8, 16, 16, { color: '#ffffff', filled: false });
            screen.render(upgrade.sprite, 81.5 + xOffset, config.BottomUiBarHeight + 10.5);
        });

        // Render hover
        const hoverOptions: RenderTextOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };

        if (this.selectedUpgrade) {
            const level = this.playerStats.getUpgradeLevel(this.selectedUpgrade.upgradeType);
            const cost = this.selectedUpgrade.cost(level);

            screen.renderRectangle(this.mouseX + 5, this.mouseY - 7.5, 35, 18.5, { color: '#303030', alpha: 0.9 })
            screen.renderText(this.selectedUpgrade.name, this.mouseX + 7, this.mouseY - 3, hoverOptions);
            screen.renderText(this.selectedUpgrade.description, this.mouseX + 7, this.mouseY + 1, hoverOptions);
            screen.renderText(`Level: ${level}`, this.mouseX + 7, this.mouseY + 5, hoverOptions);

            const fontColor = this.playerStats.getPoints() >= cost ? '#47f219' : '#ff1f1f';
            screen.renderText(`Cost: ${cost}`, this.mouseX + 7, this.mouseY + 9, {...hoverOptions, fontColor});
        }
    }

    private getBaseUpgradePosition = () => ({ x: 79, y: config.BottomUiBarHeight + 8, width: 16, height: 16 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override click(x: number, y: number): void {

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override hover(x: number, y: number): void {
        const upgradePosition = this.getBaseUpgradePosition();

        Upgrades.getUpgrades().forEach((upgrade, index) => {
            const xOffset = this.upgradeOffsetX * index;

            if (Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                this.selectedUpgrade = upgrade;
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override drag(x: number, y: number): void {
        
    }

    public override resetHover(): void {
        this.selectedUpgrade = undefined;
    }

    public override resetDrag(): void {
        
    }

    public override tick(): void {
    }
}