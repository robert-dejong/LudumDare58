import { Unit } from "../../../libs/Core/Action/Unit";
import { config } from "../../Config";
import { CpuThreadMobEntity } from "../../Entity/CpuThread/CpuThreadMobEntity";
import { NpuCoreMobEntity } from "../../Entity/NpuCore/NpuCoreMobEntity";
import { UpgradeType } from "../../Upgrades/UpgradeType";
var BuyPlaceableAction = /** @class */ (function () {
    function BuyPlaceableAction(upgrade, x, y) {
        this.upgrade = upgrade;
        this.x = x;
        this.y = y;
    }
    return BuyPlaceableAction;
}());
export { BuyPlaceableAction };
var BuyPlaceableActionHandler = /** @class */ (function () {
    function BuyPlaceableActionHandler(playerStats, level, screen) {
        this.playerStats = playerStats;
        this.level = level;
        this.screen = screen;
    }
    BuyPlaceableActionHandler.prototype.handle = function (action) {
        var entity = action.upgrade.upgradeType == UpgradeType.CpuThread ?
            new CpuThreadMobEntity(action.x, action.y) :
            new NpuCoreMobEntity(action.x, action.y);
        if (action.x < config.leftUiBarWidth)
            return;
        if (action.y < 0)
            return;
        if (action.x + entity.getSprite().width > this.screen.getSize().width)
            return;
        if (action.y + entity.getSprite().height > config.BottomUiBarHeight)
            return;
        this.playerStats.buyUpgrade(action.upgrade);
        this.level.add(entity);
        return Unit.value;
    };
    return BuyPlaceableActionHandler;
}());
export { BuyPlaceableActionHandler };
//# sourceMappingURL=BuyPlaceableUpgrade.js.map