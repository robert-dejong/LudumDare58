import { VariableMobEntity } from "../VariableMobEntity";

export class ArrayMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'String[] todo', width: 31, height: 9, speed: 0.22, damage: 8, health: 5, points: 3 });
    }
}