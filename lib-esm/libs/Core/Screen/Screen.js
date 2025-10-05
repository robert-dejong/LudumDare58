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
import { RenderRectangleOptions } from "./RenderRectangleOptions";
import { RenderTextOptions } from "./RenderTextOptions";
var Screen = /** @class */ (function () {
    function Screen(scale) {
        var _this = this;
        this.getSize = function () { return ({ width: _this.width, height: _this.height }); };
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.scale = scale;
    }
    Screen.prototype.render = function (sprite, x, y) {
        if (!sprite.loaded)
            return;
        if (!this.shouldRender(x, y, sprite.width, sprite.height))
            return; // Still neccessary for entities
        this.context.drawImage(sprite.image, x, y, sprite.width, sprite.height);
    };
    Screen.prototype.setSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.imageSmoothingEnabled = false;
        this.context.scale(this.scale, this.scale);
        this.width = this.canvas.width / this.scale;
        this.height = this.canvas.height / this.scale;
    };
    Screen.prototype.renderText = function (text, x, y, options) {
        var _this = this;
        if (options === void 0) { options = new RenderTextOptions(); }
        options = __assign(__assign({}, new RenderTextOptions()), options);
        this.context.fillStyle = options.fontColor;
        this.context.font = "".concat(options.fontWeight, " ").concat(options.fontSize, "px Arial");
        if (options.width && options.textAlign === 'center') {
            var textWidth = this.context.measureText(text).width;
            this.context.fillText(text, x + (options.width - textWidth) / 2, y);
            return;
        }
        if (options.width && options.textAlign === 'right') {
            this.context.textAlign = 'right';
            this.context.fillText(text, x + options.width, y);
            this.context.textAlign = 'left';
            return;
        }
        if (!options.maxWidth) {
            this.context.fillText(text, x, y);
            return;
        }
        var words = text.split(' ');
        var currentLine = '';
        var lineHeight = 0;
        words.forEach(function (word) {
            var line = "".concat(currentLine).concat(currentLine.length !== 0 ? ' ' : '').concat(word);
            if (_this.context.measureText(line).width > options.maxWidth) {
                _this.context.fillText(currentLine, x, y + lineHeight);
                currentLine = word;
                lineHeight += (options.fontSize * 1.2);
                return;
            }
            currentLine = line;
        });
        if (currentLine.length > 0) {
            this.context.fillText(currentLine, x, y + lineHeight);
        }
    };
    Screen.prototype.renderRectangle = function (x, y, width, height, options) {
        if (options === void 0) { options = new RenderRectangleOptions(); }
        options = __assign(__assign({}, new RenderRectangleOptions()), options);
        this.context.fillStyle = options.color;
        this.context.strokeStyle = options.color;
        this.context.globalAlpha = options.alpha;
        if (options.filled) {
            this.context.fillRect(x, y, width, height);
        }
        else {
            this.context.beginPath();
            this.context.rect(x, y, width, height);
            this.context.stroke();
        }
        this.context.globalAlpha = 1.0;
    };
    Screen.prototype.renderLine = function (x, y, width, height, brushSize, color) {
        this.context.strokeStyle = color;
        this.context.lineWidth = brushSize;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(width, height);
        this.context.stroke();
    };
    Screen.prototype.setCursorVisibility = function (visible) {
        this.canvas.style.cursor = visible ? 'auto' : 'none';
    };
    Screen.prototype.shouldRender = function (absoluteX, absoluteY, renderWidth, renderHeight) {
        if (absoluteX > this.width)
            return false;
        if (absoluteY > this.height)
            return false;
        if (absoluteX + renderWidth < 0)
            return false;
        if (absoluteY + renderHeight < 0)
            return false;
        return true;
    };
    return Screen;
}());
export var createScreen2D = function (scale) { return new Screen(scale); };
//# sourceMappingURL=Screen.js.map