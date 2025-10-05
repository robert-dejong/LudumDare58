var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { ArrayMobEntity } from "../Entity/Mobs/ArrayMobEntity";
import { ForLoopMobEntity } from "../Entity/Mobs/ForLoopMobEntity";
import { HashMapMobEntity } from "../Entity/Mobs/HashMapMobEntity";
import { HelloWorldMobEntity } from "../Entity/Mobs/HelloWorldMobEntity";
import { NodeModulesMobEntity } from "../Entity/Mobs/NodeModulesMobEntity";
import { PrintMobEntity } from "../Entity/Mobs/PrintMobEntity";
import { TodoCommentMobEntity } from "../Entity/Mobs/TodoCommentMobEntity";
var baseSpawnInterval = 280;
var minSpawnInterval = 45;
var baseSpawnCount = 2;
var maxSpawnCount = 7;
var spawnableEnemies = [
    { weightModifier: 1.25, spawn: function () { return new HelloWorldMobEntity(); } },
    { weightModifier: 0.7, spawn: function () { return new ArrayMobEntity(); } },
    { weightModifier: 0.35, spawn: function () { return new TodoCommentMobEntity(); } },
    { weightModifier: 0.23, spawn: function () { return new ForLoopMobEntity(); } },
    { weightModifier: 0.5, spawn: function () { return new HashMapMobEntity(); } },
    { weightModifier: 0.4, spawn: function () { return new PrintMobEntity(); } },
    { weightModifier: 0.024, spawn: function () { return new NodeModulesMobEntity(); } }
];
var EnemyWaveTask = /** @class */ (function (_super) {
    __extends(EnemyWaveTask, _super);
    function EnemyWaveTask(level, playerStats) {
        var _this = _super.call(this, 1, true, 'waves') || this;
        _this.level = level;
        _this.playerStats = playerStats;
        _this.ticksPassed = 0;
        _this.nextSpawnTicks = 20;
        return _this;
    }
    EnemyWaveTask.prototype.execute = function () {
        this.ticksPassed++;
        if (this.ticksPassed < this.nextSpawnTicks)
            return;
        var secondsPassed = this.ticksPassed / 60;
        var intervalReduction = Math.floor(secondsPassed / 20) * 4;
        var clampedInterval = Math.max(minSpawnInterval, baseSpawnInterval - intervalReduction);
        // Add randomness
        var randomFactor = 1 + (Math.random() * 0.4 - 0.2);
        var spawnInterval = Math.floor(clampedInterval * randomFactor);
        var scaledCount = baseSpawnCount + Math.floor(secondsPassed / 20);
        var clampedCount = Math.min(scaledCount, maxSpawnCount);
        // Add randomness
        var randomCount = Math.max(2, clampedCount + Math.floor(Math.random() * 3) - 2);
        for (var i = 0; i < randomCount; i++) {
            var entity = this.getEntityToSpawn();
            var xOffset = Math.random() * (450 * entity.getSpeed());
            var x = (config.screenWidth / config.renderScale) + xOffset;
            var y = 5 + (Math.random() * (config.BottomUiBarHeight - 10 - entity.getSprite().height));
            var healthModifier = 1 + ((this.ticksPassed) * 0.0003);
            var speedModifier = 1 + ((this.ticksPassed) * 0.00006);
            entity.teleport(x, y);
            entity.setHealthModifier(healthModifier);
            entity.setSpeedModifier(speedModifier);
            this.level.add(entity);
        }
        this.nextSpawnTicks = this.ticksPassed + spawnInterval;
    };
    EnemyWaveTask.prototype.getEntityToSpawn = function () {
        var maxIndex = Math.min(this.ticksPassed / 600, spawnableEnemies.length);
        var weights = [];
        var difficultyProgress = Math.min(this.ticksPassed / 30000, 1);
        for (var i = 0; i < maxIndex; i++) {
            var earlyWeight = 1 / (i + 1);
            var lateWeight = (i + 1);
            var weightModifierIncreaser = (i * ((this.ticksPassed * 1.2) * 0.000005));
            var weight = (earlyWeight * (1 - difficultyProgress) + lateWeight * difficultyProgress * spawnableEnemies[i].weightModifier) + weightModifierIncreaser;
            weights.push(weight);
        }
        var totalWeight = weights.reduce(function (sum, w) { return sum + w; }, 0);
        var random = Math.random() * totalWeight;
        var cumulative = 0;
        for (var i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return spawnableEnemies[i].spawn();
            }
        }
        return spawnableEnemies[0].spawn();
    };
    return EnemyWaveTask;
}(Task));
export { EnemyWaveTask };
//# sourceMappingURL=EnemyWaveTask.js.map