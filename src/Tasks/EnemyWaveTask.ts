import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { ArrayMobEntity } from "../Entity/Mobs/ArrayMobEntity";
import { ForLoopMobEntity } from "../Entity/Mobs/ForLoopMobEntity";
import { HelloWorldMobEntity } from "../Entity/Mobs/HelloWorldMobEntity";
import { NodeModulesMobEntity } from "../Entity/Mobs/NodeModulesMobEntity";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { VariableMobEntity } from "../Entity/VariableMobEntity";
import { ILevel } from "../Level/ILevel";

const baseSpawnInterval = 320; 
const minSpawnInterval = 60;
const baseSpawnCount = 1;
const maxSpawnCount = 5;

type Spawn = () => VariableMobEntity;
const spawnableEnemies: Spawn[] = [
    () => new HelloWorldMobEntity(),
    () => new ArrayMobEntity(),
    () => new ForLoopMobEntity(),
    () => new NodeModulesMobEntity()
];

export class EnemyWaveTask extends Task {
    private ticksPassed = 0;
    private nextSpawnTicks = 60;

    constructor(private readonly level: ILevel, private readonly playerStats: PlayerStats) {
        super(1, true, 'waves');
    }

    public execute(): void {
        this.ticksPassed++;

        if (this.ticksPassed < this.nextSpawnTicks) return;

        const secondsPassed = this.ticksPassed / 60;

        // Scaling the interval
        const intervalReduction = Math.floor(secondsPassed / 8) * 4;
        const clampedInterval = Math.max(minSpawnInterval, baseSpawnInterval - intervalReduction);

        // Add randomness: ±20% variation
        const randomFactor = 1 + (Math.random() * 0.4 - 0.2); // Between 0.8 and 1.2
        const spawnInterval = Math.floor(clampedInterval * randomFactor);

        const scaledCount = baseSpawnCount + Math.floor(secondsPassed / 20);
        const clampedCount = Math.min(scaledCount, maxSpawnCount);

        // Add randomness: ±1 enemy (but minimum 1)
        const randomCount = Math.max(1, clampedCount + Math.floor(Math.random() * 3) - 2);

        for(let i = 0; i < randomCount; i++) {
            const entity = this.getEntityToSpawn();
            const xOffset = Math.random() * (450 * entity.getSpeed());
            const x = (config.screenWidth / config.renderScale) + xOffset;
            const y = 5 + (Math.random() * (config.BottomUiBarHeight - 10 - entity.getSprite().height));

            entity.teleport(x, y);
            this.level.add(entity);
            console.log('SPAWNING ENEMY');
        }

        this.nextSpawnTicks = this.ticksPassed + spawnInterval;
    }

    private getEntityToSpawn(): VariableMobEntity {
        const maxIndex = Math.min(this.ticksPassed / 600, spawnableEnemies.length);
        const index = Math.floor(Math.random() * maxIndex);

        return spawnableEnemies[index]();
    }
}