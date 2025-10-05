import { config } from "../../Config";
import { Upgrade } from "../../Upgrades/Upgrade";
import { UpgradeType } from "../../Upgrades/UpgradeType";

export class PlayerStats {
    private maxHealth: number;
    private health: number;
    private score: number;
    private points: number;
    private wave: number;
    private upgradeLevels: Record<UpgradeType, number>;

    public initialize() {
        this.maxHealth = 100;
        this.health = 100;
        this.score = 0;
        this.points = 100000; // TODO: 0
        this.wave = 0;
        this.upgradeLevels = {
            [UpgradeType.CpuOverclock]: 1,
            [UpgradeType.Ram]: 1,
            [UpgradeType.Broom]: 1,
            [UpgradeType.CpuThread]: 1,
            [UpgradeType.NpuCore]: 1,
        };
    }

    public dealDamage(amount: number) {
        this.health -= amount;

        if (this.health <= 0) {
            // TODO: Death
        }
    }

    public addHealth(amount: number) {
        this.health += amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    public getHealth(): number {
        return this.health;
    }

    public addMaxHealth(amount: number) {
        this.maxHealth += amount;
    }

    public getMaxHealth(): number {
        return this.maxHealth;
    }

    public canBuyUpgrade(upgrade: Upgrade): boolean {
        const level = this.upgradeLevels[upgrade.upgradeType];
        const cost = upgrade.cost(level);

        return this.points >= cost;
    }

    public buyUpgrade(upgrade: Upgrade): boolean {
        if (!this.canBuyUpgrade(upgrade)) return false;
        
        const level = this.upgradeLevels[upgrade.upgradeType];
        const cost = upgrade.cost(level);
        
        this.removePoints(cost);
        this.giveUpgrade(upgrade);

        // TODO: Upgrades - play sound to let player know
        return true;
    }

    public giveUpgrade(upgrade: Upgrade): void {
        const level = this.upgradeLevels[upgrade.upgradeType];

        this.upgradeLevels[upgrade.upgradeType] = level + 1;

        if (upgrade.upgradeType === UpgradeType.Ram) {
            this.maxHealth += config.memoryIncreasePerLevel;
            this.health += config.memoryIncreasePerLevel;
        }
    }

    public getUpgradeLevel(upgradeType: UpgradeType): number {
        return this.upgradeLevels[upgradeType];
    }

    //public get getUpgradeLevels(): ReadonlyMap<UpgradeType, number> {
     //   return this.upgradeLevels;
    //}

    public addScore(score: number) {
        this.score += score;
    }

    public getScore(): number {
        return this.score;
    }

    public addPoints(amount: number) {
        this.points += amount;
    }

    public removePoints(amount: number) {
        this.points -= amount;
    }

    public getPoints(): number {
        return this.points;
    }

    public increaseWave() {
        this.wave++;
    }

    public getWave(): number {
        return this.wave;
    }
}