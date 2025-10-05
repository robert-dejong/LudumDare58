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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { UI } from "../../libs/Core/UI/UI";
import { Maths } from "../../libs/Core/Util/Maths";
import { BuyPlaceableAction } from "../Actions/Upgrades/BuyPlaceableUpgrade";
import { config } from "../Config";
import { Main } from "../Main";
import { Upgrades } from "../Upgrades/Upgrades";
var BottomUi = /** @class */ (function (_super) {
    __extends(BottomUi, _super);
    function BottomUi(playerStats, actionExecutor) {
        var _this = _super.call(this) || this;
        _this.playerStats = playerStats;
        _this.actionExecutor = actionExecutor;
        _this.buyableUpgrades = Upgrades.getUpgrades().filter(function (u) { return !u.isPlaceable; });
        _this.placeableUpgrades = Upgrades.getUpgrades().filter(function (u) { return u.isPlaceable; });
        _this.upgradeOffsetX = 18;
        _this.placeableUpgradeOffsetX = 3;
        _this.getBaseUpgradePosition = function () { return ({ x: 79, y: config.BottomUiBarHeight + 8, width: 15, height: 15 }); };
        return _this;
    }
    BottomUi.prototype.getPosition = function () {
        return { x: 0, y: config.BottomUiBarHeight, width: config.screenWidth, height: config.screenHeight - config.BottomUiBarHeight };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.render = function (screen) {
        var _this = this;
        var _a = screen.getSize(), width = _a.width, height = _a.height;
        var textOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };
        screen.renderRectangle(0, config.BottomUiBarHeight, width, height - config.BottomUiBarHeight, { color: '#000000' });
        screen.renderLine(0, config.BottomUiBarHeight, width, config.BottomUiBarHeight, 0.5, '#ffffff');
        // Health bar
        screen.renderRectangle(2.5, config.BottomUiBarHeight + 9.5, 71, 11, { color: '#ffffff' });
        screen.renderRectangle(3, config.BottomUiBarHeight + 10, 70, 10, { color: 'red' });
        var healthWidth = (70 / this.playerStats.getMaxHealth()) * this.playerStats.getHealth();
        screen.renderRectangle(3, config.BottomUiBarHeight + 10, healthWidth, 10, { color: 'green' });
        screen.renderText("Unused memory: ".concat(this.playerStats.getHealth(), " MB"), 3, config.BottomUiBarHeight + 16.3, __assign(__assign({}, textOptions), { width: 70, textAlign: 'center' }));
        // Score
        screen.renderText("MB's cleaned: ".concat(this.playerStats.getScore()), 2, config.BottomUiBarHeight + 5, textOptions);
        screen.renderText("Points: ".concat(this.playerStats.getPoints()), 40, config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: 33.5, textAlign: 'right' }));
        // Labels
        var buyablesWidth = this.upgradeOffsetX * this.buyableUpgrades.length;
        screen.renderText('Upgrades', 79, config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: buyablesWidth, textAlign: 'center' }));
        screen.renderText('Workers', 79 + buyablesWidth + this.placeableUpgradeOffsetX, config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: this.upgradeOffsetX * this.placeableUpgrades.length, textAlign: 'center' }));
        // Dividers
        screen.renderLine(76, config.BottomUiBarHeight, 76, height, 0.5, '#ffffff');
        screen.renderLine(79 + buyablesWidth, config.BottomUiBarHeight, 79 + buyablesWidth, height, 0.5, '#ffffff');
        // Upgrades
        Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            screen.renderRectangle(79 + xOffset, config.BottomUiBarHeight + 8, 15, 15, { color: '#353535', filled: true });
            screen.render(upgrade.icon, 81 + xOffset, config.BottomUiBarHeight + 10);
        });
        // Render hover
        var hoverOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };
        if (this.selectedUpgrade) {
            var level = this.playerStats.getUpgradeLevel(this.selectedUpgrade.upgradeType);
            var cost = this.selectedUpgrade.cost(level);
            screen.renderRectangle(this.mouseX + 5, this.mouseY - 9.5, 35, 18.5, { color: '#303030', alpha: 0.9 });
            screen.renderText(this.selectedUpgrade.name, this.mouseX + 7, this.mouseY - 5, hoverOptions);
            screen.renderText(this.selectedUpgrade.description, this.mouseX + 7, this.mouseY - 1, hoverOptions);
            screen.renderText("Level: ".concat(level), this.mouseX + 7, this.mouseY + 3, hoverOptions);
            var fontColor = this.playerStats.getPoints() >= cost ? '#47f219' : '#ff1f1f';
            screen.renderText("Cost: ".concat(cost), this.mouseX + 7, this.mouseY + 7, __assign(__assign({}, hoverOptions), { fontColor: fontColor }));
        }
        if (this.draggingUpgrade) {
            screen.render(this.draggingUpgrade.icon, this.mouseX, this.mouseY);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.click = function (x, y) {
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        if (this.draggingUpgrade) {
            var buyPlaceableAction = new BuyPlaceableAction(this.draggingUpgrade, this.mouseX, this.mouseY);
            this.actionExecutor.execute(buyPlaceableAction);
            this.draggingUpgrade = undefined;
            return;
        }
        if (this.selectedUpgrade) {
            if (!this.playerStats.canBuyUpgrade(this.selectedUpgrade)) {
                // TODO: Not enough points - play sound to let player know
                return;
            }
            if (this.selectedUpgrade.isPlaceable) {
                this.draggingUpgrade = this.selectedUpgrade;
                this.selectedUpgrade = undefined;
                return;
            }
            this.playerStats.buyUpgrade(this.selectedUpgrade);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.hover = function (x, y) {
        var _this = this;
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        this.selectedUpgrade = undefined;
        if (this.draggingUpgrade)
            return;
        var upgradePosition = this.getBaseUpgradePosition();
        Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            if (Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                _this.selectedUpgrade = upgrade;
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.drag = function (x, y) {
        var _this = this;
        if (Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        if (!this.selectedUpgrade)
            return;
        var upgradePosition = this.getBaseUpgradePosition();
        Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            if (_this.selectedUpgrade && upgrade.upgradeType === _this.selectedUpgrade.upgradeType && !Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                if (_this.selectedUpgrade.isPlaceable) {
                    if (_this.playerStats.canBuyUpgrade(_this.selectedUpgrade)) {
                        _this.draggingUpgrade = _this.selectedUpgrade;
                    }
                }
                _this.selectedUpgrade = undefined;
            }
        });
    };
    BottomUi.prototype.resetHover = function () {
    };
    BottomUi.prototype.resetDrag = function () {
    };
    BottomUi.prototype.tick = function () {
    };
    BottomUi.prototype.clear = function () {
        this.selectedUpgrade = undefined;
        this.draggingUpgrade = undefined;
    };
    return BottomUi;
}(UI));
export { BottomUi };
//# sourceMappingURL=BottomUi.js.map