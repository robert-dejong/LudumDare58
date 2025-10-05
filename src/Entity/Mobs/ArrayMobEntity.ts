import { VariableMobEntity } from "../VariableMobEntity";

export class ArrayMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'String[] todo', width: 31, height: 9, speed: 0.20, damage: 6, health: 5, points: 3 });
    }
}