import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { PlayerStats } from "../../Entity/Player/PlayerStats";

export class IncreasePointsAction implements IAction {
    constructor(public readonly points: number) { }
}

export class IncreasePointsActionHandler implements IActionHandler<IncreasePointsAction> {

    constructor(private readonly playerStats: PlayerStats) { }

    public handle(action: IncreasePointsAction): Unit {
        this.playerStats.addPoints(action.points);

        return Unit.value;
    }
}