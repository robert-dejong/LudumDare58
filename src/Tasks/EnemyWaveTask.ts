import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { MobEntity } from "../Entity/MobEntity";
import { HelloWorldMobEntity } from "../Entity/Mobs/HelloWorldMobEntity";
import { VariableMobEntity } from "../Entity/Mobs/VariableMobEntity";
import { PlayerStats } from "../Entity/Player/PlayerStats";
import { ILevel } from "../Level/ILevel";

export class EnemyWaveTask extends Task {

    private waveSpawnTimeLeft = 1; // 5
    private enemiesToSpawn = 3;

    constructor(private readonly level: ILevel, private readonly playerStats: PlayerStats) {
        super(60, true, 'waves');
    }

    public execute(): void {
        const enemyCount = this.level.getEntities().filter(e => e instanceof MobEntity && e instanceof VariableMobEntity).length;

        if (enemyCount > 0) return;

        if (this.waveSpawnTimeLeft > 0) {
            this.waveSpawnTimeLeft--;
            console.log('TIME LEFT DECREASED');
            return;
        }

        for(let i = 0; i < this.enemiesToSpawn; i++) {
            const entity = new HelloWorldMobEntity();
            const xOffset = Math.random() * (450 * entity.getSpeed());
            const x = (config.screenWidth / config.renderScale) + xOffset;
            const y = 5 + (Math.random() * (config.BottomUiBarHeight - 10 - entity.getSprite().height));

            entity.teleport(x, y);
            this.level.add(entity);
            console.log('SPAWNING ENEMY');
        }

        this.waveSpawnTimeLeft = 5;
    }
}