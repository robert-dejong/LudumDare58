import { VariableMobEntity } from "../VariableMobEntity";

export class HelloWorldMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'string helloWorld', width: 37, height: 9, speed: 0.25, damage: 5, health: 1, points: 2 });
    }
}