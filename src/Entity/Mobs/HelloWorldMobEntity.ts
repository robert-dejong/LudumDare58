import { VariableMobEntity } from "./VariableMobEntity";

export class HelloWorldMobEntity extends VariableMobEntity {

    constructor() {
        super({ name: 'var helloWorld', width: 36, height: 9, speed: 0.25, damage: 3, health: 1, points: 1 });
    }
}