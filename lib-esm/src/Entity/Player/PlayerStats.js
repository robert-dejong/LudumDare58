import { config } from "../../Config";
import { UpgradeType } from "../../Upgrades/UpgradeType";
var PlayerStats = /** @class */ (function () {
    function PlayerStats() {
    }
    PlayerStats.prototype.initialize = function () {
        var _a;
        this.maxHealth = 100;
        this.health = 100;
        this.score = 0;
        this.points = 0;
        this.wave = 0;
        this.upgradeLevels = (_a = {},
            _a[UpgradeType.CpuOverclock] = 1,
            _a[UpgradeType.Ram] = 1,
            _a[UpgradeType.Broom] = 1,
            _a[UpgradeType.CpuThread] = 1,
            _a[UpgradeType.NpuCore] = 1,
            _a);
    };
    PlayerStats.prototype.dealDamage = function (amount) {
        this.health -= amount;
        if (this.isDied()) {
            // TODO: Death sound
        }
    };
    PlayerStats.prototype.addHealth = function (amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    };
    PlayerStats.prototype.getHealth = function () {
        return this.health;
    };
    PlayerStats.prototype.addMaxHealth = function (amount) {
        this.maxHealth += amount;
    };
    PlayerStats.prototype.getMaxHealth = function () {
        return this.maxHealth;
    };
    PlayerStats.prototype.canBuyUpgrade = function (upgrade) {
        var level = this.upgradeLevels[upgrade.upgradeType];
        var cost = upgrade.cost(level);
        return this.points >= cost;
    };
    PlayerStats.prototype.buyUpgrade = function (upgrade) {
        if (!this.canBuyUpgrade(upgrade))
            return false;
        var level = this.upgradeLevels[upgrade.upgradeType];
        var cost = upgrade.cost(level);
        this.removePoints(cost);
        this.giveUpgrade(upgrade);
        // TODO: Upgrades - play sound to let player know
        return true;
    };
    PlayerStats.prototype.giveUpgrade = function (upgrade) {
        var level = this.upgradeLevels[upgrade.upgradeType];
        this.upgradeLevels[upgrade.upgradeType] = level + 1;
        if (upgrade.upgradeType === UpgradeType.Ram) {
            this.maxHealth += config.memoryIncreasePerLevel;
            this.health += config.memoryIncreasePerLevel;
        }
    };
    PlayerStats.prototype.getUpgradeLevel = function (upgradeType) {
        return this.upgradeLevels[upgradeType];
    };
    PlayerStats.prototype.addScore = function (score) {
        this.score += score;
    };
    PlayerStats.prototype.getScore = function () {
        return this.score;
    };
    PlayerStats.prototype.addPoints = function (amount) {
        this.points += amount;
    };
    PlayerStats.prototype.removePoints = function (amount) {
        this.points -= amount;
    };
    PlayerStats.prototype.getPoints = function () {
        return this.points;
    };
    PlayerStats.prototype.increaseWave = function () {
        this.wave++;
    };
    PlayerStats.prototype.getWave = function () {
        return this.wave;
    };
    PlayerStats.prototype.isDied = function () {
        return this.getHealth() <= 0;
    };
    return PlayerStats;
}());
export { PlayerStats };
//# sourceMappingURL=PlayerStats.js.map