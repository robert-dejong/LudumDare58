var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Task } from "../../libs/Core/Task/Task";
import { config } from "../Config";
import { CpuOverclockItem } from "../Entity/Items/CpuOverclockItem";
import { RamRepairItem } from "../Entity/Items/RamRepairItem";
import { RestartItem } from "../Entity/Items/RestartItem";
var baseItemSpawnRateInSeconds = 25;
var randomItemSpawnRateInSeconds = 15;
var itemSpawns = [
    function (x, y) { return new RamRepairItem(x, y); },
];
var rareItemSpawns = [
    function (x, y) { return new CpuOverclockItem(x, y); },
    function (x, y) { return new RestartItem(x, y); },
];
var ItemSpawnTask = /** @class */ (function (_super) {
    __extends(ItemSpawnTask, _super);
    function ItemSpawnTask(level) {
        var _this = _super.call(this, 60, true, 'item-spawns') || this;
        _this.level = level;
        _this.spawnItemInSeconds = 20;
        _this.getNextItemSpawnInSeconds = function () { return baseItemSpawnRateInSeconds + (Math.random() * randomItemSpawnRateInSeconds); };
        return _this;
    }
    ItemSpawnTask.prototype.execute = function () {
        this.spawnItemInSeconds--;
        if (this.spawnItemInSeconds > 0) {
            return;
        }
        var xRange = (config.screenWidth / config.renderScale) - config.leftUiBarWidth - 14;
        var yRange = config.BottomUiBarHeight - 14;
        var x = Math.random() * xRange + 7 + config.leftUiBarWidth;
        var y = Math.random() * yRange + 7;
        var tableRoll = Math.random() * 2;
        var itemTable = tableRoll <= 1 ? rareItemSpawns : itemSpawns;
        var itemRoll = Math.floor(Math.random() * itemTable.length);
        var item = itemTable[itemRoll](x, y);
        this.level.add(item);
        this.spawnItemInSeconds = this.getNextItemSpawnInSeconds();
    };
    return ItemSpawnTask;
}(Task));
export { ItemSpawnTask };
//# sourceMappingURL=ItemSpawnTask.js.map