import { IActionExecutor } from "../../libs/Core/Action/IActionExecutor";
import { IScreen } from "../../libs/Core/Screen/IScreen";
import { RenderTextOptions } from "../../libs/Core/Screen/RenderTextOptions";
import { UI } from "../../libs/Core/UI/UI";
import { Maths } from "../../libs/Core/Util/Maths";
import { BuyPlaceableAction } from "../Actions/Upgrades/BuyPlaceableUpgrade";
import { config } from "../Config";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { Main } from "../Main";
import { Upgrade } from "../Upgrades/Upgrade";
import { Upgrades } from "../Upgrades/Upgrades";

export class BottomUi extends UI {
    private selectedUpgrade: Upgrade;
    private draggingUpgrade: Upgrade;

    private readonly buyableUpgrades = Upgrades.getUpgrades().filter(u => !u.isPlaceable);
    private readonly placeableUpgrades = Upgrades.getUpgrades().filter(u => u.isPlaceable);
    
    private readonly upgradeOffsetX = 18;
    private readonly placeableUpgradeOffsetX = 3;

    constructor(private readonly playerStats: PlayerStats, private readonly actionExecutor: IActionExecutor) {
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

        screen.renderText(`Unused memory: ${this.playerStats.getHealth()} MB`, 3, config.BottomUiBarHeight + 16.3, {...textOptions, width: 70, textAlign: 'center' });

        // Score
        screen.renderText(`MB's cleaned: ${this.playerStats.getScore()}`, 2, config.BottomUiBarHeight + 5, textOptions);
        screen.renderText(`Points: ${this.playerStats.getPoints()}`, 40, config.BottomUiBarHeight + 5, { ...textOptions, width: 33.5, textAlign: 'right' });
        
        // Labels
        const buyablesWidth = this.upgradeOffsetX * this.buyableUpgrades.length;
        screen.renderText('Upgrades', 79, config.BottomUiBarHeight + 5, {...textOptions, width: buyablesWidth, textAlign: 'center' });
        screen.renderText('Workers', 79 + buyablesWidth + this.placeableUpgradeOffsetX, config.BottomUiBarHeight + 5, {...textOptions, width: this.upgradeOffsetX * this.placeableUpgrades.length, textAlign: 'center' });

        // Dividers
        screen.renderLine(76, config.BottomUiBarHeight, 76, height, 0.5, '#ffffff');
        screen.renderLine(79 + buyablesWidth, config.BottomUiBarHeight, 79 + buyablesWidth, height, 0.5, '#ffffff');

        // Upgrades
        Upgrades.getUpgrades().forEach((upgrade, index) => {
            const xOffset = (this.upgradeOffsetX * index) + (upgrade.isPlaceable ? this.placeableUpgradeOffsetX : 0);
            screen.renderRectangle(79 + xOffset, config.BottomUiBarHeight + 8, 15, 15, { color: '#353535', filled: true });
            screen.render(upgrade.icon, 81 + xOffset, config.BottomUiBarHeight + 10);
        });

        // Render hover
        const hoverOptions: RenderTextOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };

        if (this.selectedUpgrade) {
            const level = this.playerStats.getUpgradeLevel(this.selectedUpgrade.upgradeType);
            const cost = this.selectedUpgrade.cost(level);

            screen.renderRectangle(this.mouseX + 5, this.mouseY - 9.5, 35, 18.5, { color: '#303030', alpha: 0.9 })
            screen.renderText(this.selectedUpgrade.name, this.mouseX + 7, this.mouseY - 5, hoverOptions);
            screen.renderText(this.selectedUpgrade.description, this.mouseX + 7, this.mouseY - 1, hoverOptions);
            screen.renderText(`Level: ${level}`, this.mouseX + 7, this.mouseY + 3, hoverOptions);

            const fontColor = this.playerStats.getPoints() >= cost ? '#47f219' : '#ff1f1f';
            screen.renderText(`Cost: ${cost}`, this.mouseX + 7, this.mouseY + 7, {...hoverOptions, fontColor});
        }
        
        if (this.draggingUpgrade) {
            screen.render(this.draggingUpgrade.icon, this.mouseX, this.mouseY);
        }
    }

    private getBaseUpgradePosition = () => ({ x: 79, y: config.BottomUiBarHeight + 8, width: 15, height: 15 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override click(x: number, y: number): void {
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }

        if (this.draggingUpgrade) {
            const buyPlaceableAction = new BuyPlaceableAction(this.draggingUpgrade, this.mouseX, this.mouseY);
            this.actionExecutor.execute(buyPlaceableAction);
            this.draggingUpgrade = undefined;
            return;
        }

        if (this.selectedUpgrade) {
            if (!this.playerStats.canBuyUpgrade(this.selectedUpgrade)) {
                // TODO: Not enough points - play sound to let player know
                return;
            }

            if (this.selectedUpgrade.isPlaceable) {
                this.draggingUpgrade = this.selectedUpgrade;
                this.selectedUpgrade = undefined;
                return;
            }

            this.playerStats.buyUpgrade(this.selectedUpgrade);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override hover(x: number, y: number): void {
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }

        this.selectedUpgrade = undefined;

        if (this.draggingUpgrade) return;
        
        const upgradePosition = this.getBaseUpgradePosition();

        Upgrades.getUpgrades().forEach((upgrade, index) => {
            const xOffset = (this.upgradeOffsetX * index) + (upgrade.isPlaceable ? this.placeableUpgradeOffsetX : 0);

            if (Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                this.selectedUpgrade = upgrade;
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override drag(x: number, y: number): void {
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }

        if (!this.selectedUpgrade) return;
        
        const upgradePosition = this.getBaseUpgradePosition();

        Upgrades.getUpgrades().forEach((upgrade, index) => {
            const xOffset = (this.upgradeOffsetX * index) + (upgrade.isPlaceable ? this.placeableUpgradeOffsetX : 0);

            if (this.selectedUpgrade && upgrade.upgradeType === this.selectedUpgrade.upgradeType && !Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                if (this.selectedUpgrade.isPlaceable) {
                    if (this.playerStats.canBuyUpgrade(this.selectedUpgrade)) {
                        this.draggingUpgrade = this.selectedUpgrade;
                    }
                }
                this.selectedUpgrade = undefined;
            }
        });
    }

    public override resetHover(): void {
        
    }

    public override resetDrag(): void {
        
    }

    public override tick(): void {
    }

    public clear(): void {
        this.selectedUpgrade = undefined;
        this.draggingUpgrade = undefined;
    }
}