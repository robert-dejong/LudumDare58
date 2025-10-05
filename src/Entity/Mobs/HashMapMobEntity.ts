import { VariableMobEntity } from "../VariableMobEntity";

export class HashMapMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'HashMap<> holyGrail', width: 44, height: 7, speed: 0.30, damage: 10, health: 8, points: 6 });
    }
}