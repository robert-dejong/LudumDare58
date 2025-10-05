import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { PlayerStats } from "../../Entity/Player/PlayerStats";

export class DamageRamAction implements IAction {
    constructor(public readonly damage: number) { }
}

export class DamageRamActionHandler implements IActionHandler<DamageRamAction> {

    constructor(private readonly playerStats: PlayerStats) { }

    public handle(action: DamageRamAction): Unit {
        this.playerStats.dealDamage(action.damage);

        return Unit.value;
    }
}