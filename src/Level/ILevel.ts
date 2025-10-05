import { Entity } from "../Entity/Entity";

export interface ILevel {
    tick(): void;
    render(): void;
    add(entity: Entity): void;
    getEntities(): Array<Entity>;
}