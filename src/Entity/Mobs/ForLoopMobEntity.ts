import { VariableMobEntity } from "../VariableMobEntity";

export class ForLoopMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'int i', width: 12, height: 9, speed: 1.32, damage: 5, health: 0.1, points: 5 });
    }
}