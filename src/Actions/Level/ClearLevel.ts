import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { Entity } from "../../Entity/Entity";
import { VariableMobEntity } from "../../Entity/VariableMobEntity";
import { ILevel } from "../../Level/ILevel";

export class ClearLevelAction implements IAction {
    constructor() { }
}

export class ClearLevelActionHandler implements IActionHandler<ClearLevelAction> {

    constructor(private readonly level: ILevel) { }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle(action: ClearLevelAction): Unit {
        const mobEntities = this.level.getEntities().filter(this.isVariableMobEntity);

        for(const entity of mobEntities) {
            entity.removed = true;
        }
        
        return Unit.value;
    }

    private isVariableMobEntity(e: Entity): e is VariableMobEntity {
        return e instanceof VariableMobEntity;
    }
}