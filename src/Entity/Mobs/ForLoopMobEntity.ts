import { VariableMobEntity } from "../VariableMobEntity";

export class ForLoopMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'int i', width: 12, height: 9, speed: 1.3, damage: 1, health: 1, points: 5 });
    }
}