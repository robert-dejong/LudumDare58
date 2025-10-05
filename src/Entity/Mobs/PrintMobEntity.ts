import { VariableMobEntity } from "../VariableMobEntity";

export class PrintMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'print(\'debug\')', width: 32, height: 10, speed: 0.35, damage: 7, health: 0.5, points: 2 });
    }
}