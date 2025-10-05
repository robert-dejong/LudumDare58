import { VariableMobEntity } from "../VariableMobEntity";

export class TodoCommentMobEntity extends VariableMobEntity {
    constructor() {
        super({ name: 'TODO: fix later', width: 32, height: 10, speed: 0.04, damage: 25, health: 15, points: 8 });
    }
}