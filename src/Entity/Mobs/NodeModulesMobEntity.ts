import { VariableMobEntity } from "../VariableMobEntity";

export class NodeModulesMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'node_modules', width: 37, height: 16, speed: 0.05, damage: 15, health: 15, points: 15 });
    }
}