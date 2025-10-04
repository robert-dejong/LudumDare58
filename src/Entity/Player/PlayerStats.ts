import { UpgradeType } from "../../Upgrades/UpgradeType";

export class PlayerStats {
    private maxHealth = 100;
    private health = 100;
    private score = 0;
    private points = 0;
    private upgradeLevels: Record<UpgradeType, number>;

    public initialize() {
        this.maxHealth = 100;
        this.health = 100;
        this.score = 0;
        this.points = 0;
        this.upgradeLevels = {
            [UpgradeType.Cpu]: 1,
            [UpgradeType.Threads]: 1,
            [UpgradeType.Ram]: 1,
        };
    }

    public dealDamage(amount: number) {
        this.health -= amount;
    }

    public addHealh(amount: number) {
        this.health += amount;
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

    public increaseUpgradeLevel(upgradeType: UpgradeType): void {
        const level = this.upgradeLevels[upgradeType] + 1;
        this.upgradeLevels[upgradeType] = level;
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
}