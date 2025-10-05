import { VariableMobEntity } from "../VariableMobEntity";

export class NodeModulesMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'node_modules', width: 37, height: 20, speed: 0.05, damage: 20, health: 100, points: 30 });
    }
}