import { VariableMobEntity } from "../VariableMobEntity";

export class HelloWorldMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'string helloWorld', width: 41, height: 9, speed: 0.25, damage: 3, health: 1, points: 1 });
    }
}