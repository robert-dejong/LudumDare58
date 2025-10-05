import { Unit } from "../../../libs/Core/Action/Unit";
import { config } from "../../Config";
import { Sprites } from "../../Sprites";
var RenderLevelAction = /** @class */ (function () {
    function RenderLevelAction() {
    }
    return RenderLevelAction;
}());
export { RenderLevelAction };
var RenderLevelActionHandler = /** @class */ (function () {
    function RenderLevelActionHandler(level, screen) {
        this.level = level;
        this.screen = screen;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RenderLevelActionHandler.prototype.handle = function (_action) {
        this.screen.render(Sprites.background, 0, 0);
        //const { width, height } = this.screen.getSize();
        //this.screen.renderRectangle(0, 0, width, height, { color: '#162d19' });
        //this.screen.renderLine(0, 30, 30, 0, 1, '#224b15');
        //this.screen.renderLine(0, 35, 35, 0, 1, '#224b15');
        this.renderLeftUiBar();
        this.renderEntities();
        return Unit.value;
    };
    RenderLevelActionHandler.prototype.renderLeftUiBar = function () {
        var height = this.screen.getSize().height;
        var imageHeight = Sprites.ram.height;
        var topMargin = 15;
        var bottomMargin = 15;
        var leftMargin = 2;
        var imageCount = 4;
        var usableHeight = config.BottomUiBarHeight - topMargin - bottomMargin - imageHeight;
        var spacing = usableHeight / (imageCount - 1);
        var lineMarginX = Sprites.ram.width + 2 + leftMargin;
        var lineWidth = 4;
        this.screen.renderRectangle(0, 0, config.leftUiBarWidth, height, { color: '#2a5644' });
        for (var i = 0; i < imageCount; i++) {
            var y = topMargin + i * spacing;
            this.screen.render(Sprites.ram, leftMargin, y);
            var lineHeight = y + (Sprites.ram.height / 2);
            this.screen.renderLine(lineMarginX, lineHeight, lineMarginX + lineWidth, lineHeight, 0.5, '#ffffff');
        }
        this.screen.renderLine(lineMarginX + lineWidth, 0, lineMarginX + lineWidth, config.BottomUiBarHeight, 0.5, '#ffffff');
    };
    RenderLevelActionHandler.prototype.renderEntities = function () {
        var entities = this.level.getEntities().sort(function (a, b) { return a.renderOrder - b.renderOrder; });
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            entity.render(this.screen);
        }
    };
    return RenderLevelActionHandler;
}());
export { RenderLevelActionHandler };
//# sourceMappingURL=RenderLevel.js.map