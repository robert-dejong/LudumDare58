import { IAction } from "../../../libs/Core/Action/IAction";
import { IActionHandler } from "../../../libs/Core/Action/IActionHandler";
import { Unit } from "../../../libs/Core/Action/Unit";
import { PlayerStats } from "../../Entity/Player/PlayerStats";

export class IncreaseScoreAction implements IAction {
    constructor(public readonly score: number) { }
}

export class IncreaseScoreActionHandler implements IActionHandler<IncreaseScoreAction> {

    constructor(private readonly playerStats: PlayerStats) { }

    public handle(action: IncreaseScoreAction): Unit {
        this.playerStats.addScore(action.score);

        return Unit.value;
    }
}