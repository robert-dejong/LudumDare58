import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { ArrayMobEntity } from "../Entity/Mobs/ArrayMobEntity";
import { ForLoopMobEntity } from "../Entity/Mobs/ForLoopMobEntity";
import { HashMapMobEntity } from "../Entity/Mobs/HashMapMobEntity";
import { HelloWorldMobEntity } from "../Entity/Mobs/HelloWorldMobEntity";
import { NodeModulesMobEntity } from "../Entity/Mobs/NodeModulesMobEntity";
import { PrintMobEntity } from "../Entity/Mobs/PrintMobEntity";
import { TodoCommentMobEntity } from "../Entity/Mobs/TodoCommentMobEntity";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { VariableMobEntity } from "../Entity/VariableMobEntity";
import { ILevel } from "../Level/ILevel";

const baseSpawnInterval = 280; 
const minSpawnInterval = 45;
const baseSpawnCount = 2;
const maxSpawnCount = 7;

type Spawn = () => VariableMobEntity;
interface SpawnInfo {
    weightModifier: number;
    spawn: Spawn;
}
const spawnableEnemies: SpawnInfo[] = [
    { weightModifier: 1.25, spawn: () => new HelloWorldMobEntity() },
    { weightModifier: 0.7, spawn: () => new ArrayMobEntity() },
    { weightModifier: 0.35, spawn: () => new TodoCommentMobEntity() },
    { weightModifier: 0.23, spawn: () => new ForLoopMobEntity() },
    { weightModifier: 0.5, spawn: () => new HashMapMobEntity() },
    { weightModifier: 0.4, spawn: () => new PrintMobEntity() },
    { weightModifier: 0.024, spawn: () => new NodeModulesMobEntity() }
];

export class EnemyWaveTask extends Task {
    private ticksPassed = 0;
    private nextSpawnTicks = 20;

    constructor(private readonly level: ILevel, private readonly playerStats: PlayerStats) {
        super(1, true, 'waves');
    }

    public execute(): void {
        this.ticksPassed++;

        if (this.ticksPassed < this.nextSpawnTicks) return;

        const secondsPassed = this.ticksPassed / 60;

        const intervalReduction = Math.floor(secondsPassed / 20) * 4;
        const clampedInterval = Math.max(minSpawnInterval, baseSpawnInterval - intervalReduction);

        // Add randomness
        const randomFactor = 1 + (Math.random() * 0.4 - 0.2);
        const spawnInterval = Math.floor(clampedInterval * randomFactor);

        const scaledCount = baseSpawnCount + Math.floor(secondsPassed / 20);
        const clampedCount = Math.min(scaledCount, maxSpawnCount);

        // Add randomness
        const randomCount = Math.max(2, clampedCount + Math.floor(Math.random() * 3) - 2);

        for(let i = 0; i < randomCount; i++) {
            const entity = this.getEntityToSpawn();
            const xOffset = Math.random() * (450 * entity.getSpeed());
            const x = (config.screenWidth / config.renderScale) + xOffset;
            const y = 5 + (Math.random() * (config.BottomUiBarHeight - 10 - entity.getSprite().height));

            const healthModifier = 1 + ((this.ticksPassed) * 0.0003);
            const speedModifier = 1 + ((this.ticksPassed) * 0.00006);
            entity.teleport(x, y);
            entity.setHealthModifier(healthModifier);
            entity.setSpeedModifier(speedModifier);
            this.level.add(entity);
        }

        this.nextSpawnTicks = this.ticksPassed + spawnInterval;
    }

    private getEntityToSpawn(): VariableMobEntity {
        const maxIndex = Math.min(this.ticksPassed / 600, spawnableEnemies.length);
        const weights: number[] = [];

        const difficultyProgress = Math.min(this.ticksPassed / 30000, 1);
        for (let i = 0; i < maxIndex; i++) {
            const earlyWeight = 1 / (i + 1);
            const lateWeight = (i + 1);
            const weightModifierIncreaser = (i * ((this.ticksPassed * 1.2) * 0.000005));
            const weight = (earlyWeight * (1 - difficultyProgress) + lateWeight * difficultyProgress * spawnableEnemies[i].weightModifier) + weightModifierIncreaser;
            weights.push(weight);
        }
        
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const random = Math.random() * totalWeight;

        let cumulative = 0;
        for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return spawnableEnemies[i].spawn();
            }
        }

        return spawnableEnemies[0].spawn();
    }
}