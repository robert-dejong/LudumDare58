(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MyLib", [], factory);
	else if(typeof exports === 'object')
		exports["MyLib"] = factory();
	else
		root["MyLib"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/Core/Action/ActionExecutor.ts":
/*!********************************************!*\
  !*** ./libs/Core/Action/ActionExecutor.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createActionExecutor: () => (/* binding */ createActionExecutor)
/* harmony export */ });
var ActionExecutor = /** @class */ (function () {
    function ActionExecutor() {
        this.handlers = new Map;
    }
    ActionExecutor.prototype.register = function (action, handler) {
        this.handlers.set(action, handler);
    };
    ActionExecutor.prototype.execute = function (action) {
        if (!this.handlers.has(action.constructor.name)) {
            throw new Error("Could not find handler for action '".concat(action.constructor.name, "'"));
        }
        var handler = this.handlers.get(action.constructor.name);
        return handler().handle(action);
    };
    return ActionExecutor;
}());
var createActionExecutor = function () { return new ActionExecutor(); };


/***/ }),

/***/ "./libs/Core/Action/Unit.ts":
/*!**********************************!*\
  !*** ./libs/Core/Action/Unit.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Unit: () => (/* binding */ Unit)
/* harmony export */ });
var Unit = { value: {} };


/***/ }),

/***/ "./libs/Core/Input/Key.ts":
/*!********************************!*\
  !*** ./libs/Core/Input/Key.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Key: () => (/* binding */ Key)
/* harmony export */ });
var Key = /** @class */ (function () {
    function Key(keys) {
        this.pressed = false;
        this.keys = Array.isArray(keys) ? keys : [keys];
    }
    Object.defineProperty(Key.prototype, "isPressed", {
        get: function () {
            return this.pressed;
        },
        enumerable: false,
        configurable: true
    });
    Key.prototype.toggle = function (pressed) {
        this.pressed = pressed;
    };
    Key.prototype.release = function () {
        this.pressed = false;
    };
    return Key;
}());



/***/ }),

/***/ "./libs/Core/Input/KeyHandler.ts":
/*!***************************************!*\
  !*** ./libs/Core/Input/KeyHandler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyHandler: () => (/* binding */ KeyHandler)
/* harmony export */ });
var KeyHandler = /** @class */ (function () {
    function KeyHandler() {
    }
    KeyHandler.init = function (binds) {
        var _loop_1 = function (value) {
            value.keys.forEach(function (key) { return KeyHandler.binds.set(key, value); });
        };
        for (var _i = 0, _a = Object.entries(binds); _i < _a.length; _i++) {
            var _b = _a[_i], value = _b[1];
            _loop_1(value);
        }
        KeyHandler.keyEvent('keydown');
        KeyHandler.keyEvent('keyup');
    };
    KeyHandler.keyEvent = function (type) {
        var pressed = type === 'keydown';
        window.addEventListener(type, function (e) {
            // e.preventDefault();
            // console.log("Pressing key: " + e.key);
            if (!KeyHandler.binds.has(e.key))
                return;
            var bind = KeyHandler.binds.get(e.key);
            bind.toggle(pressed);
        });
    };
    KeyHandler.binds = new Map();
    return KeyHandler;
}());



/***/ }),

/***/ "./libs/Core/Input/Mouse.ts":
/*!**********************************!*\
  !*** ./libs/Core/Input/Mouse.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mouse: () => (/* binding */ Mouse)
/* harmony export */ });
var Mouse = /** @class */ (function () {
    function Mouse() {
    }
    return Mouse;
}());



/***/ }),

/***/ "./libs/Core/Input/MouseHandler.ts":
/*!*****************************************!*\
  !*** ./libs/Core/Input/MouseHandler.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MouseHandler: () => (/* binding */ MouseHandler)
/* harmony export */ });
/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mouse */ "./libs/Core/Input/Mouse.ts");

var MouseHandler = /** @class */ (function () {
    function MouseHandler() {
    }
    MouseHandler.bind = function (type, action) {
        var _this = this;
        if (type === 'mousedrag') {
            this.bindMouseDrag(action);
            return;
        }
        var event = function (e) {
            _Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse.x = e.offsetX;
            _Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse.y = e.offsetY;
            if (type === 'mousemove' && _this.isPressed)
                return;
            action(e.offsetX, e.offsetY);
        };
        document.getElementById('canvas').addEventListener(type, event);
    };
    MouseHandler.bindMouseDrag = function (action) {
        var _this = this;
        document.getElementById('canvas').addEventListener('mousedown', function () {
            _this.isPressed = true;
        });
        document.getElementById('canvas').addEventListener('mouseup', function () {
            _this.isPressed = false;
        });
        document.getElementById('canvas').addEventListener('mousemove', function (e) {
            if (_this.isPressed) {
                action(e.offsetX, e.offsetY);
            }
        });
    };
    return MouseHandler;
}());



/***/ }),

/***/ "./libs/Core/Screen/RenderRectangleOptions.ts":
/*!****************************************************!*\
  !*** ./libs/Core/Screen/RenderRectangleOptions.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderRectangleOptions: () => (/* binding */ RenderRectangleOptions)
/* harmony export */ });
var RenderRectangleOptions = /** @class */ (function () {
    function RenderRectangleOptions() {
        this.color = '#ffffff';
        this.alpha = 1.0;
        this.filled = true;
    }
    return RenderRectangleOptions;
}());



/***/ }),

/***/ "./libs/Core/Screen/RenderTextOptions.ts":
/*!***********************************************!*\
  !*** ./libs/Core/Screen/RenderTextOptions.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderTextOptions: () => (/* binding */ RenderTextOptions)
/* harmony export */ });
var RenderTextOptions = /** @class */ (function () {
    function RenderTextOptions() {
        this.fontSize = 6;
        this.fontColor = '#ffffff';
        this.fontWeight = 400;
        this.maxWidth = undefined;
        this.width = undefined;
        this.textAlign = 'left';
    }
    return RenderTextOptions;
}());



/***/ }),

/***/ "./libs/Core/Screen/Screen.ts":
/*!************************************!*\
  !*** ./libs/Core/Screen/Screen.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createScreen2D: () => (/* binding */ createScreen2D)
/* harmony export */ });
/* harmony import */ var _RenderRectangleOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RenderRectangleOptions */ "./libs/Core/Screen/RenderRectangleOptions.ts");
/* harmony import */ var _RenderTextOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RenderTextOptions */ "./libs/Core/Screen/RenderTextOptions.ts");
var __assign = (undefined && undefined.__assign) || function () {
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
        if (options === void 0) { options = new _RenderTextOptions__WEBPACK_IMPORTED_MODULE_1__.RenderTextOptions(); }
        options = __assign(__assign({}, new _RenderTextOptions__WEBPACK_IMPORTED_MODULE_1__.RenderTextOptions()), options);
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
        if (options === void 0) { options = new _RenderRectangleOptions__WEBPACK_IMPORTED_MODULE_0__.RenderRectangleOptions(); }
        options = __assign(__assign({}, new _RenderRectangleOptions__WEBPACK_IMPORTED_MODULE_0__.RenderRectangleOptions()), options);
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
var createScreen2D = function (scale) { return new Screen(scale); };


/***/ }),

/***/ "./libs/Core/Screen/Sprite.ts":
/*!************************************!*\
  !*** ./libs/Core/Screen/Sprite.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sprite: () => (/* binding */ Sprite)
/* harmony export */ });
var Sprite = /** @class */ (function () {
    function Sprite(path) {
        var _this = this;
        this.image = new Image();
        this.image.src = path;
        this.image.onload = function () {
            _this.width = _this.image.width;
            _this.height = _this.image.height;
            _this.loaded = true;
        };
    }
    return Sprite;
}());



/***/ }),

/***/ "./libs/Core/Settings/Settings.ts":
/*!****************************************!*\
  !*** ./libs/Core/Settings/Settings.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
var settings = {
    isMuted: function () { var _a; return (_a = window['isMuted']) !== null && _a !== void 0 ? _a : false; },
    difficulty: function () { var _a; return (_a = window['difficulty']) !== null && _a !== void 0 ? _a : 'normal'; },
    menu: function () { var _a; return (_a = window['gamemenu']) !== null && _a !== void 0 ? _a : 'mainmenu'; },
    setMuted: function (isMuted) {
        window['isMuted'] = isMuted;
    },
    setDifficulty: function (difficulty) {
        window['difficulty'] = difficulty;
    },
    setMenu: function (menu) {
        window['gamemenu'] = menu;
    }
};


/***/ }),

/***/ "./libs/Core/Task/Task.ts":
/*!********************************!*\
  !*** ./libs/Core/Task/Task.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
var Task = /** @class */ (function () {
    function Task(ticks, loop, name) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        this.shouldExecute = function () { return _this.ticks <= 0; };
        this.reset = function () { _this.ticks = _this.initialTicks; };
        this.tick = function () { _this.ticks--; };
        this.initialTicks = ticks;
        this.ticks = ticks;
        this.loop = loop;
        this.name = name;
    }
    Task.prototype.onCreate = function () {
    };
    return Task;
}());



/***/ }),

/***/ "./libs/Core/Task/TaskManager.ts":
/*!***************************************!*\
  !*** ./libs/Core/Task/TaskManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTaskManager: () => (/* binding */ createTaskManager)
/* harmony export */ });
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = new Array();
    }
    TaskManager.prototype.tick = function () {
        var _this = this;
        this.tasks.forEach(function (task) {
            task.tick();
            if (!task.shouldExecute()) {
                return;
            }
            task.execute();
            task.reset();
            if (!task.loop) {
                _this.tasks = _this.tasks.filter(function (t) { return t !== task; });
            }
        });
    };
    TaskManager.prototype.remove = function (name) {
        this.tasks = this.tasks.filter(function (t) { return t.name !== name; });
    };
    TaskManager.prototype.add = function (task) {
        this.tasks.push(task);
        task.onCreate();
    };
    TaskManager.prototype.reset = function () {
        this.tasks.forEach(function (task) { return task.reset(); });
    };
    TaskManager.prototype.clear = function () {
        this.tasks = new Array();
    };
    return TaskManager;
}());
var createTaskManager = function () { return new TaskManager(); };


/***/ }),

/***/ "./libs/Core/UI/UI.ts":
/*!****************************!*\
  !*** ./libs/Core/UI/UI.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
var UI = /** @class */ (function () {
    function UI() {
        var _this = this;
        this.isShow = function () { return _this.show; };
        this.setMousePosition = function (x, y) { (_this.mouseX = x, _this.mouseY = y); };
        this.toggle = function () {
            _this.show = !_this.show;
            if (!_this.show) {
                _this.reset();
            }
        };
    }
    UI.prototype.click = function (x, y) { };
    UI.prototype.hover = function (x, y) { };
    UI.prototype.drag = function (x, y) { };
    UI.prototype.resetHover = function () { };
    UI.prototype.resetDrag = function () { };
    UI.prototype.reset = function () {
        this.resetHover();
        this.resetDrag();
    };
    return UI;
}());



/***/ }),

/***/ "./libs/Core/UI/UIManager.ts":
/*!***********************************!*\
  !*** ./libs/Core/UI/UIManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUIManager: () => (/* binding */ createUIManager)
/* harmony export */ });
/* harmony import */ var _Util_Maths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/Maths */ "./libs/Core/Util/Maths.ts");

var UIManager = /** @class */ (function () {
    // !Maths.intersects(this.dragStartX, this.dragStartY, 0, 0, e.offsetX - (dragThreshold / 2), e.offsetY - (dragThreshold / 2), dragThreshold, dragThreshold)
    function UIManager() {
        var _this = this;
        this.toggle = function (name) { return _this.interfaces.get(name).toggle(); };
        this.add = function (name, ui) { (_this.interfaces.set(name, ui)); };
        this.interfaces = new Map();
    }
    UIManager.prototype.tick = function () {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            ui.tick();
        });
    };
    UIManager.prototype.render = function (screen) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            ui.render(screen);
        });
    };
    UIManager.prototype.handleClick = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.reset();
            //if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
            ui.click(x - position.x, y - position.y);
            //}
        });
    };
    UIManager.prototype.handleHover = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.setMousePosition(x, y);
            ui.resetHover();
            if (_Util_Maths__WEBPACK_IMPORTED_MODULE_0__.Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.reset();
                ui.hover(x - position.x, y - position.y);
            }
        });
    };
    UIManager.prototype.handleDrag = function (x, y) {
        this.interfaces.forEach(function (ui) {
            if (!ui.isShow())
                return;
            var position = ui.getPosition();
            ui.setMousePosition(x, y);
            if (_Util_Maths__WEBPACK_IMPORTED_MODULE_0__.Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.resetHover();
                ui.drag(x - position.x, y - position.y);
            }
        });
    };
    return UIManager;
}());
var createUIManager = function () { return new UIManager(); };


/***/ }),

/***/ "./libs/Core/Util/Direction.ts":
/*!*************************************!*\
  !*** ./libs/Core/Util/Direction.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Direction: () => (/* binding */ Direction),
/* harmony export */   Directions: () => (/* binding */ Directions)
/* harmony export */ });
var Direction = /** @class */ (function () {
    function Direction() {
    }
    Direction.get = function (x, y) {
        if (y < 0)
            return Directions.up;
        if (y > 0)
            return Directions.down;
        if (x < 0)
            return Directions.left;
        if (x > 0)
            return Directions.right;
        throw new Error("Could not get direction for ".concat(x, ", ").concat(y));
    };
    return Direction;
}());

var Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["down"] = 1] = "down";
    Directions[Directions["left"] = 2] = "left";
    Directions[Directions["right"] = 3] = "right";
})(Directions || (Directions = {}));


/***/ }),

/***/ "./libs/Core/Util/Maths.ts":
/*!*********************************!*\
  !*** ./libs/Core/Util/Maths.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Maths: () => (/* binding */ Maths)
/* harmony export */ });
var Maths = /** @class */ (function () {
    function Maths() {
    }
    Maths.intersects = function (x1, y1, width1, height1, x2, y2, width2, height2) {
        return (x1 + width1 >= x2 && x1 <= x2 + width2) &&
            (y1 + height1 >= y2 && y1 <= y2 + height2);
    };
    Maths.getDistance = function (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return Maths;
}());



/***/ }),

/***/ "./src/Actions/Entity/DamageRam.ts":
/*!*****************************************!*\
  !*** ./src/Actions/Entity/DamageRam.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DamageRamAction: () => (/* binding */ DamageRamAction),
/* harmony export */   DamageRamActionHandler: () => (/* binding */ DamageRamActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");

var DamageRamAction = /** @class */ (function () {
    function DamageRamAction(damage) {
        this.damage = damage;
    }
    return DamageRamAction;
}());

var DamageRamActionHandler = /** @class */ (function () {
    function DamageRamActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    DamageRamActionHandler.prototype.handle = function (action) {
        this.playerStats.dealDamage(action.damage);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return DamageRamActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Entity/IncreasePoints.ts":
/*!**********************************************!*\
  !*** ./src/Actions/Entity/IncreasePoints.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncreasePointsAction: () => (/* binding */ IncreasePointsAction),
/* harmony export */   IncreasePointsActionHandler: () => (/* binding */ IncreasePointsActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");

var IncreasePointsAction = /** @class */ (function () {
    function IncreasePointsAction(points) {
        this.points = points;
    }
    return IncreasePointsAction;
}());

var IncreasePointsActionHandler = /** @class */ (function () {
    function IncreasePointsActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    IncreasePointsActionHandler.prototype.handle = function (action) {
        this.playerStats.addPoints(action.points);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return IncreasePointsActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Entity/IncreaseScoreAction.ts":
/*!***************************************************!*\
  !*** ./src/Actions/Entity/IncreaseScoreAction.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncreaseScoreAction: () => (/* binding */ IncreaseScoreAction),
/* harmony export */   IncreaseScoreActionHandler: () => (/* binding */ IncreaseScoreActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");

var IncreaseScoreAction = /** @class */ (function () {
    function IncreaseScoreAction(score) {
        this.score = score;
    }
    return IncreaseScoreAction;
}());

var IncreaseScoreActionHandler = /** @class */ (function () {
    function IncreaseScoreActionHandler(playerStats) {
        this.playerStats = playerStats;
    }
    IncreaseScoreActionHandler.prototype.handle = function (action) {
        this.playerStats.addScore(action.score);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return IncreaseScoreActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Entity/MoveMobEntity.ts":
/*!*********************************************!*\
  !*** ./src/Actions/Entity/MoveMobEntity.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoveMobEntityAction: () => (/* binding */ MoveMobEntityAction),
/* harmony export */   MoveMobEntityActionHandler: () => (/* binding */ MoveMobEntityActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Util_Direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Util/Direction */ "./libs/Core/Util/Direction.ts");
/* harmony import */ var _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../libs/Core/Util/Maths */ "./libs/Core/Util/Maths.ts");


var MoveMobEntityAction = /** @class */ (function () {
    function MoveMobEntityAction(entity, moveX, moveY) {
        this.entity = entity;
        this.moveX = moveX;
        this.moveY = moveY;
    }
    return MoveMobEntityAction;
}());

var MoveMobEntityActionHandler = /** @class */ (function () {
    function MoveMobEntityActionHandler(level) {
        this.level = level;
    }
    MoveMobEntityActionHandler.prototype.handle = function (action) {
        var entity = action.entity;
        var moveX = action.moveX, moveY = action.moveY;
        if (moveX === 0 && moveY === 0)
            return;
        if (entity.animations) {
            entity.walkTime++;
            if (entity.animations.isNextAnimation(entity.walkTime)) {
                entity.animationIndex = entity.animations.nextIndex(entity.direction, entity.animationIndex);
                entity.walkTime = 0;
            }
        }
        var canMoveX = this.canMove(entity, moveX, 0);
        var canMoveY = this.canMove(entity, 0, moveY);
        var canMove = this.canMove(entity, moveX, moveY);
        if (!canMoveX && !canMoveY && !canMove)
            return;
        if (!canMoveX)
            moveX = 0;
        if (!canMoveY)
            moveY = 0;
        if (moveX === 0 && moveY === 0)
            return;
        entity.x += moveX;
        entity.y += moveY;
        entity.direction = _libs_Core_Util_Direction__WEBPACK_IMPORTED_MODULE_0__.Direction.get(moveX, moveY);
    };
    MoveMobEntityActionHandler.prototype.canMove = function (target, moveX, moveY) {
        var entities = this.level.getEntities();
        var newX = target.x + moveX;
        var newY = target.y + moveY;
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            if (entity === target)
                continue;
            if (!_libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__.Maths.intersects(newX, newY, target.getSprite().width, target.getSprite().height, entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                continue;
            }
            target.onCollide(entity);
            entity.onCollide(target);
        }
        return true;
    };
    return MoveMobEntityActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Entity/WorkerFireProjectile.ts":
/*!****************************************************!*\
  !*** ./src/Actions/Entity/WorkerFireProjectile.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerFireProjectileAction: () => (/* binding */ WorkerFireProjectileAction),
/* harmony export */   WorkerFireProjectileActionHandler: () => (/* binding */ WorkerFireProjectileActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Util/Maths */ "./libs/Core/Util/Maths.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_CpuThread_CpuThreadProjectileEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Entity/CpuThread/CpuThreadProjectileEntity */ "./src/Entity/CpuThread/CpuThreadProjectileEntity.ts");
/* harmony import */ var _Entity_NpuCore_NpuCoreProjectileEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Entity/NpuCore/NpuCoreProjectileEntity */ "./src/Entity/NpuCore/NpuCoreProjectileEntity.ts");
/* harmony import */ var _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Entity/VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
/* harmony import */ var _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Upgrades/UpgradeType */ "./src/Upgrades/UpgradeType.ts");






var WorkerFireProjectileAction = /** @class */ (function () {
    function WorkerFireProjectileAction(worker) {
        this.worker = worker;
    }
    return WorkerFireProjectileAction;
}());

var WorkerFireProjectileActionHandler = /** @class */ (function () {
    function WorkerFireProjectileActionHandler(level, playerStats) {
        this.level = level;
        this.playerStats = playerStats;
    }
    WorkerFireProjectileActionHandler.prototype.handle = function (action) {
        var level = this.playerStats.getUpgradeLevel(_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_5__.UpgradeType.CpuOverclock);
        var attackDelay = action.worker.workerType === 'cpu' ?
            action.worker.attackDelay - (level * 20) :
            action.worker.attackDelay;
        if (attackDelay < 10)
            attackDelay = 10;
        if (action.worker.timeSinceLastAttack < attackDelay) {
            action.worker.timeSinceLastAttack++;
            return;
        }
        var target = this.findNearestEntity(action.worker);
        if (!target)
            return;
        var x = action.worker.x + (action.worker.getSprite().width / 2) - 1;
        var y = action.worker.y + (action.worker.getSprite().height / 2) - 1;
        var xOffset = target.x - action.worker.x;
        var yOffset = target.y - action.worker.y;
        var distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        var directionX = xOffset / distance;
        var directionY = yOffset / distance;
        if (action.worker.workerType === 'cpu') {
            var cpuLevel = this.playerStats.getUpgradeLevel(_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_5__.UpgradeType.CpuOverclock);
            var speedModifier = _Config__WEBPACK_IMPORTED_MODULE_1__.config.getCpuThreadModifier(cpuLevel);
            var damageModifier = _Config__WEBPACK_IMPORTED_MODULE_1__.config.getCpuThreadModifier(cpuLevel);
            var projectile = new _Entity_CpuThread_CpuThreadProjectileEntity__WEBPACK_IMPORTED_MODULE_2__.CpuThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier);
            this.level.add(projectile);
        }
        else if (action.worker.workerType === 'npu') {
            var projectile = new _Entity_NpuCore_NpuCoreProjectileEntity__WEBPACK_IMPORTED_MODULE_3__.NpuCoreProjectileEntity(x, y, directionX, directionY);
            this.level.add(projectile);
        }
        action.worker.timeSinceLastAttack = 0;
    };
    WorkerFireProjectileActionHandler.prototype.findNearestEntity = function (worker) {
        var entities = this.level.getEntities().filter(this.isVariableMobEntity);
        if (entities.length === 0)
            return undefined;
        var nearest = entities[0];
        var minDistance = _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_0__.Maths.getDistance(worker.x, worker.y, nearest.x, nearest.y);
        for (var i = 1; i < entities.length; i++) {
            var entity = entities[i];
            var distance = _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_0__.Maths.getDistance(worker.x, worker.y, entity.x, entity.y);
            if (distance < minDistance) {
                nearest = entity;
                minDistance = distance;
            }
        }
        return nearest;
    };
    WorkerFireProjectileActionHandler.prototype.isVariableMobEntity = function (e) {
        return e.x <= (_Config__WEBPACK_IMPORTED_MODULE_1__.config.screenWidth / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale) && e instanceof _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_4__.VariableMobEntity;
    };
    return WorkerFireProjectileActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Level/ClearLevel.ts":
/*!*****************************************!*\
  !*** ./src/Actions/Level/ClearLevel.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClearLevelAction: () => (/* binding */ ClearLevelAction),
/* harmony export */   ClearLevelActionHandler: () => (/* binding */ ClearLevelActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Entity/VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");


var ClearLevelAction = /** @class */ (function () {
    function ClearLevelAction() {
    }
    return ClearLevelAction;
}());

var ClearLevelActionHandler = /** @class */ (function () {
    function ClearLevelActionHandler(level) {
        this.level = level;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ClearLevelActionHandler.prototype.handle = function (action) {
        var mobEntities = this.level.getEntities().filter(this.isVariableMobEntity);
        for (var _i = 0, mobEntities_1 = mobEntities; _i < mobEntities_1.length; _i++) {
            var entity = mobEntities_1[_i];
            entity.dealDamage(Number.MAX_VALUE);
        }
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    ClearLevelActionHandler.prototype.isVariableMobEntity = function (e) {
        return e instanceof _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_1__.VariableMobEntity;
    };
    return ClearLevelActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Level/GenerateLevel.ts":
/*!********************************************!*\
  !*** ./src/Actions/Level/GenerateLevel.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenerateLevelAction: () => (/* binding */ GenerateLevelAction),
/* harmony export */   GenerateLevelActionHandler: () => (/* binding */ GenerateLevelActionHandler)
/* harmony export */ });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_CpuThread_CpuThreadMobEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Entity/CpuThread/CpuThreadMobEntity */ "./src/Entity/CpuThread/CpuThreadMobEntity.ts");
/* harmony import */ var _Entity_Mobs_PrintMobEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Entity/Mobs/PrintMobEntity */ "./src/Entity/Mobs/PrintMobEntity.ts");
/* harmony import */ var _Level_Level__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Level/Level */ "./src/Level/Level.ts");




var GenerateLevelAction = /** @class */ (function () {
    function GenerateLevelAction() {
    }
    return GenerateLevelAction;
}());

var GenerateLevelActionHandler = /** @class */ (function () {
    function GenerateLevelActionHandler(actionExecutor) {
        this.actionExecutor = actionExecutor;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GenerateLevelActionHandler.prototype.handle = function (action) {
        var level = (0,_Level_Level__WEBPACK_IMPORTED_MODULE_3__.createLevel)(this.actionExecutor);
        var x = (_Config__WEBPACK_IMPORTED_MODULE_0__.config.screenWidth / _Config__WEBPACK_IMPORTED_MODULE_0__.config.renderScale) / 2;
        var y = _Config__WEBPACK_IMPORTED_MODULE_0__.config.BottomUiBarHeight / 2;
        var cpuThread = new _Entity_CpuThread_CpuThreadMobEntity__WEBPACK_IMPORTED_MODULE_1__.CpuThreadMobEntity(x + _Config__WEBPACK_IMPORTED_MODULE_0__.config.leftUiBarWidth - 13, y - 6);
        level.add(cpuThread);
        var printEntity = new _Entity_Mobs_PrintMobEntity__WEBPACK_IMPORTED_MODULE_2__.PrintMobEntity();
        printEntity.teleport(350, 60);
        level.add(printEntity);
        // level.add(new RamRepairItem(30, 77));
        return level;
    };
    return GenerateLevelActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Level/RenderLevel.ts":
/*!******************************************!*\
  !*** ./src/Actions/Level/RenderLevel.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderLevelAction: () => (/* binding */ RenderLevelAction),
/* harmony export */   RenderLevelActionHandler: () => (/* binding */ RenderLevelActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");



var RenderLevelAction = /** @class */ (function () {
    function RenderLevelAction() {
    }
    return RenderLevelAction;
}());

var RenderLevelActionHandler = /** @class */ (function () {
    function RenderLevelActionHandler(level, screen) {
        this.level = level;
        this.screen = screen;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RenderLevelActionHandler.prototype.handle = function (_action) {
        this.screen.render(_Sprites__WEBPACK_IMPORTED_MODULE_2__.Sprites.background, 0, 0);
        //const { width, height } = this.screen.getSize();
        //this.screen.renderRectangle(0, 0, width, height, { color: '#162d19' });
        //this.screen.renderLine(0, 30, 30, 0, 1, '#224b15');
        //this.screen.renderLine(0, 35, 35, 0, 1, '#224b15');
        this.renderLeftUiBar();
        this.renderEntities();
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    RenderLevelActionHandler.prototype.renderLeftUiBar = function () {
        var height = this.screen.getSize().height;
        var imageHeight = _Sprites__WEBPACK_IMPORTED_MODULE_2__.Sprites.ram.height;
        var topMargin = 15;
        var bottomMargin = 15;
        var leftMargin = 2;
        var imageCount = 4;
        var usableHeight = _Config__WEBPACK_IMPORTED_MODULE_1__.config.BottomUiBarHeight - topMargin - bottomMargin - imageHeight;
        var spacing = usableHeight / (imageCount - 1);
        var lineMarginX = _Sprites__WEBPACK_IMPORTED_MODULE_2__.Sprites.ram.width + 2 + leftMargin;
        var lineWidth = 4;
        this.screen.renderRectangle(0, 0, _Config__WEBPACK_IMPORTED_MODULE_1__.config.leftUiBarWidth, height, { color: '#2a5644' });
        for (var i = 0; i < imageCount; i++) {
            var y = topMargin + i * spacing;
            this.screen.render(_Sprites__WEBPACK_IMPORTED_MODULE_2__.Sprites.ram, leftMargin, y);
            var lineHeight = y + (_Sprites__WEBPACK_IMPORTED_MODULE_2__.Sprites.ram.height / 2);
            this.screen.renderLine(lineMarginX, lineHeight, lineMarginX + lineWidth, lineHeight, 0.5, '#ffffff');
        }
        this.screen.renderLine(lineMarginX + lineWidth, 0, lineMarginX + lineWidth, _Config__WEBPACK_IMPORTED_MODULE_1__.config.BottomUiBarHeight, 0.5, '#ffffff');
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



/***/ }),

/***/ "./src/Actions/MouseClickAction.ts":
/*!*****************************************!*\
  !*** ./src/Actions/MouseClickAction.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MouseClickAction: () => (/* binding */ MouseClickAction),
/* harmony export */   MouseClickActionHandler: () => (/* binding */ MouseClickActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Main */ "./src/Main.ts");



var MouseClickAction = /** @class */ (function () {
    function MouseClickAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseClickAction;
}());

var MouseClickActionHandler = /** @class */ (function () {
    function MouseClickActionHandler(uiManager, playerActions, playerStats) {
        this.uiManager = uiManager;
        this.playerActions = playerActions;
        this.playerStats = playerStats;
    }
    MouseClickActionHandler.prototype.handle = function (action) {
        var x = action.x / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        var y = action.y / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        // console.log(`Mouseclick at: ${action.x} ${action.y}`);
        if (_Main__WEBPACK_IMPORTED_MODULE_2__.Main.paused)
            return;
        if (this.playerStats.isDied())
            return;
        this.uiManager.handleClick(x, y);
        this.playerActions.useBroom(x, y);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return MouseClickActionHandler;
}());



/***/ }),

/***/ "./src/Actions/MouseDragAction.ts":
/*!****************************************!*\
  !*** ./src/Actions/MouseDragAction.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MouseDragAction: () => (/* binding */ MouseDragAction),
/* harmony export */   MouseDragActionHandler: () => (/* binding */ MouseDragActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");


var MouseDragAction = /** @class */ (function () {
    function MouseDragAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseDragAction;
}());

var MouseDragActionHandler = /** @class */ (function () {
    function MouseDragActionHandler(uiManager) {
        this.uiManager = uiManager;
    }
    MouseDragActionHandler.prototype.handle = function (action) {
        var x = action.x / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        var y = action.y / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        // console.log(`DRAG at: ${action.x} ${action.y}`);
        this.uiManager.handleDrag(x, y);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return MouseDragActionHandler;
}());



/***/ }),

/***/ "./src/Actions/MouseMovedAction.ts":
/*!*****************************************!*\
  !*** ./src/Actions/MouseMovedAction.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MouseMoveAction: () => (/* binding */ MouseMoveAction),
/* harmony export */   MouseMoveActionHandler: () => (/* binding */ MouseMoveActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");


var MouseMoveAction = /** @class */ (function () {
    function MouseMoveAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return MouseMoveAction;
}());

var MouseMoveActionHandler = /** @class */ (function () {
    function MouseMoveActionHandler(uiManager) {
        this.uiManager = uiManager;
    }
    MouseMoveActionHandler.prototype.handle = function (action) {
        var x = action.x / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        var y = action.y / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale;
        // console.log(`Mousemove at: ${action.x} ${action.y}`);
        this.uiManager.handleHover(x, y);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return MouseMoveActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Player/UseBroomAction.ts":
/*!**********************************************!*\
  !*** ./src/Actions/Player/UseBroomAction.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UseBroomAction: () => (/* binding */ UseBroomAction),
/* harmony export */   UseBroomActionHandler: () => (/* binding */ UseBroomActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../libs/Core/Util/Maths */ "./libs/Core/Util/Maths.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_ItemEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Entity/ItemEntity */ "./src/Entity/ItemEntity.ts");
/* harmony import */ var _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Entity/VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Upgrades/UpgradeType */ "./src/Upgrades/UpgradeType.ts");







var UseBroomAction = /** @class */ (function () {
    function UseBroomAction(x, y) {
        this.x = x;
        this.y = y;
    }
    return UseBroomAction;
}());

var UseBroomActionHandler = /** @class */ (function () {
    function UseBroomActionHandler(level, playerStats) {
        this.level = level;
        this.playerStats = playerStats;
    }
    UseBroomActionHandler.prototype.handle = function (action) {
        var mobEntities = this.level.getEntities().filter(this.isVariableMobEntity);
        var itemEntities = this.level.getEntities().filter(this.isItemEntity);
        var broomLevel = this.playerStats.getUpgradeLevel(_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_6__.UpgradeType.Broom);
        var damage = _Config__WEBPACK_IMPORTED_MODULE_2__.config.broomBaseDamage * _Config__WEBPACK_IMPORTED_MODULE_2__.config.getBroomDamageModifier(broomLevel);
        for (var _i = 0, itemEntities_1 = itemEntities; _i < itemEntities_1.length; _i++) {
            var item = itemEntities_1[_i];
            if (_libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__.Maths.intersects(action.x, action.y, _Sprites__WEBPACK_IMPORTED_MODULE_5__.Sprites.broom.width, _Sprites__WEBPACK_IMPORTED_MODULE_5__.Sprites.broom.height, item.x, item.y, item.getSprite().width, item.getSprite().height)) {
                item.pickup(this.playerStats);
            }
        }
        for (var _a = 0, mobEntities_1 = mobEntities; _a < mobEntities_1.length; _a++) {
            var entity = mobEntities_1[_a];
            if (_libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__.Maths.intersects(action.x, action.y, _Sprites__WEBPACK_IMPORTED_MODULE_5__.Sprites.broom.width, _Sprites__WEBPACK_IMPORTED_MODULE_5__.Sprites.broom.height, entity.x, entity.y, entity.getSprite().width, entity.getSprite().height)) {
                entity.dealDamage(damage);
            }
        }
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    UseBroomActionHandler.prototype.isVariableMobEntity = function (e) {
        return e instanceof _Entity_VariableMobEntity__WEBPACK_IMPORTED_MODULE_4__.VariableMobEntity;
    };
    UseBroomActionHandler.prototype.isItemEntity = function (e) {
        return e instanceof _Entity_ItemEntity__WEBPACK_IMPORTED_MODULE_3__.ItemEntity;
    };
    return UseBroomActionHandler;
}());



/***/ }),

/***/ "./src/Actions/Upgrades/BuyPlaceableUpgrade.ts":
/*!*****************************************************!*\
  !*** ./src/Actions/Upgrades/BuyPlaceableUpgrade.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BuyPlaceableAction: () => (/* binding */ BuyPlaceableAction),
/* harmony export */   BuyPlaceableActionHandler: () => (/* binding */ BuyPlaceableActionHandler)
/* harmony export */ });
/* harmony import */ var _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Action/Unit */ "./libs/Core/Action/Unit.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_CpuThread_CpuThreadMobEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Entity/CpuThread/CpuThreadMobEntity */ "./src/Entity/CpuThread/CpuThreadMobEntity.ts");
/* harmony import */ var _Entity_NpuCore_NpuCoreMobEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Entity/NpuCore/NpuCoreMobEntity */ "./src/Entity/NpuCore/NpuCoreMobEntity.ts");
/* harmony import */ var _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Upgrades/UpgradeType */ "./src/Upgrades/UpgradeType.ts");





var BuyPlaceableAction = /** @class */ (function () {
    function BuyPlaceableAction(upgrade, x, y) {
        this.upgrade = upgrade;
        this.x = x;
        this.y = y;
    }
    return BuyPlaceableAction;
}());

var BuyPlaceableActionHandler = /** @class */ (function () {
    function BuyPlaceableActionHandler(playerStats, level, screen) {
        this.playerStats = playerStats;
        this.level = level;
        this.screen = screen;
    }
    BuyPlaceableActionHandler.prototype.handle = function (action) {
        var entity = action.upgrade.upgradeType == _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_4__.UpgradeType.CpuThread ?
            new _Entity_CpuThread_CpuThreadMobEntity__WEBPACK_IMPORTED_MODULE_2__.CpuThreadMobEntity(action.x, action.y) :
            new _Entity_NpuCore_NpuCoreMobEntity__WEBPACK_IMPORTED_MODULE_3__.NpuCoreMobEntity(action.x, action.y);
        if (action.x < _Config__WEBPACK_IMPORTED_MODULE_1__.config.leftUiBarWidth)
            return;
        if (action.y < 0)
            return;
        if (action.x + entity.getSprite().width > this.screen.getSize().width)
            return;
        if (action.y + entity.getSprite().height > _Config__WEBPACK_IMPORTED_MODULE_1__.config.BottomUiBarHeight)
            return;
        this.playerStats.buyUpgrade(action.upgrade);
        this.level.add(entity);
        return _libs_Core_Action_Unit__WEBPACK_IMPORTED_MODULE_0__.Unit.value;
    };
    return BuyPlaceableActionHandler;
}());



/***/ }),

/***/ "./src/Config.ts":
/*!***********************!*\
  !*** ./src/Config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
var screenHeight = 600;
var renderScale = 3;
var config = {
    imageBasePath: "./data/images",
    soundBasePath: "./data/sounds",
    renderScale: renderScale,
    screenWidth: 800,
    screenHeight: screenHeight,
    leftUiBarWidth: 15,
    BottomUiBarHeight: (screenHeight / renderScale) - 25,
    cpuThreadModifierPerLevelPercentage: 15,
    memoryIncreasePerLevel: 10,
    broomDamageIncreasePerLevelPercentage: 60,
    broomBaseDamage: 1.25,
    getBroomDamageModifier: function (level) { return (config.broomDamageIncreasePerLevelPercentage / 100) * level + 1; },
    getCpuThreadModifier: function (level) { return (config.cpuThreadModifierPerLevelPercentage / 100) * level + 1; },
};


/***/ }),

/***/ "./src/Entity/CpuThread/CpuThreadMobEntity.ts":
/*!****************************************************!*\
  !*** ./src/Entity/CpuThread/CpuThreadMobEntity.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CpuThreadMobEntity: () => (/* binding */ CpuThreadMobEntity)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _WorkerEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WorkerEntity */ "./src/Entity/WorkerEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var CpuThreadMobEntity = /** @class */ (function (_super) {
    __extends(CpuThreadMobEntity, _super);
    function CpuThreadMobEntity(x, y) {
        return _super.call(this, x, y, 'cpu', 300) || this;
    }
    CpuThreadMobEntity.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.cpuIcon;
    };
    return CpuThreadMobEntity;
}(_WorkerEntity__WEBPACK_IMPORTED_MODULE_1__.WorkerEntity));



/***/ }),

/***/ "./src/Entity/CpuThread/CpuThreadProjectileEntity.ts":
/*!***********************************************************!*\
  !*** ./src/Entity/CpuThread/CpuThreadProjectileEntity.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CpuThreadProjectileEntity: () => (/* binding */ CpuThreadProjectileEntity)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _ProjectileEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProjectileEntity */ "./src/Entity/ProjectileEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var CpuThreadProjectileEntity = /** @class */ (function (_super) {
    __extends(CpuThreadProjectileEntity, _super);
    function CpuThreadProjectileEntity(x, y, directionX, directionY, speedModifier, damageModifier) {
        return _super.call(this, x, y, directionX, directionY, 0.6, 1, speedModifier, damageModifier) || this;
    }
    CpuThreadProjectileEntity.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.cpuProjectile;
    };
    return CpuThreadProjectileEntity;
}(_ProjectileEntity__WEBPACK_IMPORTED_MODULE_1__.ProjectileEntity));



/***/ }),

/***/ "./src/Entity/Entity.ts":
/*!******************************!*\
  !*** ./src/Entity/Entity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Entity: () => (/* binding */ Entity)
/* harmony export */ });
var Entity = /** @class */ (function () {
    function Entity(x, y) {
        this.renderOrder = 0;
        this.x = x;
        this.y = y;
    }
    Entity.prototype.render = function (screen) {
        screen.render(this.getSprite(), this.x, this.y);
    };
    Entity.prototype.onCreate = function (actionExecutor) {
        this.actionExecutor = actionExecutor;
    };
    Entity.prototype.tick = function () {
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Entity.prototype.onCollide = function (entity) {
    };
    Entity.prototype.executeAction = function (action) {
        return this.actionExecutor.execute(action);
    };
    return Entity;
}());



/***/ }),

/***/ "./src/Entity/ItemEntity.ts":
/*!**********************************!*\
  !*** ./src/Entity/ItemEntity.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemEntity: () => (/* binding */ ItemEntity)
/* harmony export */ });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ "./src/Entity/Entity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var despawnRateInTicks = 900;
var floatingDirectionTicks = 55;
var ItemEntity = /** @class */ (function (_super) {
    __extends(ItemEntity, _super);
    function ItemEntity(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.ticksTillDespawn = despawnRateInTicks;
        _this.floatingDirection = 'up';
        _this.floatingOffsetTicks = 0;
        _this.renderOrder = 10;
        return _this;
    }
    ItemEntity.prototype.canPass = function () {
        return true;
    };
    ItemEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        if (this.floatingDirection === 'up') {
            this.floatingOffsetTicks++;
        }
        if (this.floatingDirection === 'down') {
            this.floatingOffsetTicks--;
        }
        if (this.floatingOffsetTicks === floatingDirectionTicks) {
            this.floatingDirection = 'down';
        }
        else if (this.floatingOffsetTicks === 0) {
            this.floatingDirection = 'up';
        }
        this.ticksTillDespawn--;
        if (this.ticksTillDespawn === 0) {
            this.removed = true;
        }
    };
    ItemEntity.prototype.render = function (screen) {
        var offsetY = -(this.floatingOffsetTicks * 0.07);
        screen.render(this.getSprite(), this.x, this.y + offsetY);
        screen.render(this.getEffectSprite(), this.x + this.getSprite().width, this.y + offsetY);
    };
    return ItemEntity;
}(_Entity__WEBPACK_IMPORTED_MODULE_0__.Entity));



/***/ }),

/***/ "./src/Entity/Items/CpuOverclockItem.ts":
/*!**********************************************!*\
  !*** ./src/Entity/Items/CpuOverclockItem.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CpuOverclockItem: () => (/* binding */ CpuOverclockItem)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Upgrades/Upgrades */ "./src/Upgrades/Upgrades.ts");
/* harmony import */ var _ItemEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ItemEntity */ "./src/Entity/ItemEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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



var CpuOverclockItem = /** @class */ (function (_super) {
    __extends(CpuOverclockItem, _super);
    function CpuOverclockItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CpuOverclockItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        playerStats.giveUpgrade(_Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_1__.Upgrades.cpuOverclock);
    };
    CpuOverclockItem.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.overclockIcon;
    };
    CpuOverclockItem.prototype.getEffectSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.itemUpgradeIcon;
    };
    return CpuOverclockItem;
}(_ItemEntity__WEBPACK_IMPORTED_MODULE_2__.ItemEntity));



/***/ }),

/***/ "./src/Entity/Items/RamRepairItem.ts":
/*!*******************************************!*\
  !*** ./src/Entity/Items/RamRepairItem.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RamRepairItem: () => (/* binding */ RamRepairItem)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _ItemEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ItemEntity */ "./src/Entity/ItemEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var RamRepairItem = /** @class */ (function (_super) {
    __extends(RamRepairItem, _super);
    function RamRepairItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RamRepairItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        playerStats.addHealth(10);
    };
    RamRepairItem.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.ramIcon;
    };
    RamRepairItem.prototype.getEffectSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.itemPlusIcon;
    };
    return RamRepairItem;
}(_ItemEntity__WEBPACK_IMPORTED_MODULE_1__.ItemEntity));



/***/ }),

/***/ "./src/Entity/Items/RestartItem.ts":
/*!*****************************************!*\
  !*** ./src/Entity/Items/RestartItem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestartItem: () => (/* binding */ RestartItem)
/* harmony export */ });
/* harmony import */ var _Actions_Level_ClearLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Actions/Level/ClearLevel */ "./src/Actions/Level/ClearLevel.ts");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _ItemEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ItemEntity */ "./src/Entity/ItemEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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



var RestartItem = /** @class */ (function (_super) {
    __extends(RestartItem, _super);
    function RestartItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RestartItem.prototype.pickup = function (playerStats) {
        this.removed = true;
        this.executeAction(new _Actions_Level_ClearLevel__WEBPACK_IMPORTED_MODULE_0__.ClearLevelAction());
    };
    RestartItem.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.restartIcon;
    };
    RestartItem.prototype.getEffectSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.itemPlusIcon;
    };
    return RestartItem;
}(_ItemEntity__WEBPACK_IMPORTED_MODULE_2__.ItemEntity));



/***/ }),

/***/ "./src/Entity/MobEntity.ts":
/*!*********************************!*\
  !*** ./src/Entity/MobEntity.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MobEntity: () => (/* binding */ MobEntity)
/* harmony export */ });
/* harmony import */ var _libs_Core_Util_Direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Util/Direction */ "./libs/Core/Util/Direction.ts");
/* harmony import */ var _Actions_Entity_MoveMobEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Actions/Entity/MoveMobEntity */ "./src/Actions/Entity/MoveMobEntity.ts");
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Entity */ "./src/Entity/Entity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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



var MobEntity = /** @class */ (function (_super) {
    __extends(MobEntity, _super);
    function MobEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = _libs_Core_Util_Direction__WEBPACK_IMPORTED_MODULE_0__.Directions.down;
        _this.animationIndex = 0;
        _this.walkTime = 0;
        _this.speed = 1.0;
        return _this;
    }
    MobEntity.prototype.getSprite = function () {
        return this.animations ? this.animations.get(this.direction, this.animationIndex) : this.getSprite();
    };
    MobEntity.prototype.canPass = function () {
        return true;
    };
    MobEntity.prototype.teleport = function (x, y) {
        this.x = x;
        this.y = y;
    };
    MobEntity.prototype.move = function (moveX, moveY) {
        this.executeAction(new _Actions_Entity_MoveMobEntity__WEBPACK_IMPORTED_MODULE_1__.MoveMobEntityAction(this, moveX, moveY));
    };
    MobEntity.prototype.getSpeed = function () {
        return this.speed;
    };
    return MobEntity;
}(_Entity__WEBPACK_IMPORTED_MODULE_2__.Entity));



/***/ }),

/***/ "./src/Entity/Mobs/ArrayMobEntity.ts":
/*!*******************************************!*\
  !*** ./src/Entity/Mobs/ArrayMobEntity.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayMobEntity: () => (/* binding */ ArrayMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var ArrayMobEntity = /** @class */ (function (_super) {
    __extends(ArrayMobEntity, _super);
    function ArrayMobEntity() {
        return _super.call(this, { name: 'String[] todo', width: 31, height: 9, speed: 0.22, damage: 8, health: 5, points: 3 }) || this;
    }
    return ArrayMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/ForLoopMobEntity.ts":
/*!*********************************************!*\
  !*** ./src/Entity/Mobs/ForLoopMobEntity.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForLoopMobEntity: () => (/* binding */ ForLoopMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var ForLoopMobEntity = /** @class */ (function (_super) {
    __extends(ForLoopMobEntity, _super);
    function ForLoopMobEntity() {
        return _super.call(this, { name: 'int i', width: 12, height: 9, speed: 1.32, damage: 5, health: 0.1, points: 5 }) || this;
    }
    return ForLoopMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/HashMapMobEntity.ts":
/*!*********************************************!*\
  !*** ./src/Entity/Mobs/HashMapMobEntity.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashMapMobEntity: () => (/* binding */ HashMapMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var HashMapMobEntity = /** @class */ (function (_super) {
    __extends(HashMapMobEntity, _super);
    function HashMapMobEntity() {
        return _super.call(this, { name: 'HashMap<> holyGrail', width: 44, height: 7, speed: 0.30, damage: 10, health: 8, points: 6 }) || this;
    }
    return HashMapMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/HelloWorldMobEntity.ts":
/*!************************************************!*\
  !*** ./src/Entity/Mobs/HelloWorldMobEntity.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelloWorldMobEntity: () => (/* binding */ HelloWorldMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var HelloWorldMobEntity = /** @class */ (function (_super) {
    __extends(HelloWorldMobEntity, _super);
    function HelloWorldMobEntity() {
        return _super.call(this, { name: 'string helloWorld', width: 37, height: 9, speed: 0.25, damage: 5, health: 1, points: 2 }) || this;
    }
    return HelloWorldMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/NodeModulesMobEntity.ts":
/*!*************************************************!*\
  !*** ./src/Entity/Mobs/NodeModulesMobEntity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeModulesMobEntity: () => (/* binding */ NodeModulesMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var NodeModulesMobEntity = /** @class */ (function (_super) {
    __extends(NodeModulesMobEntity, _super);
    function NodeModulesMobEntity() {
        return _super.call(this, { name: 'node_modules', width: 37, height: 16, speed: 0.05, damage: 15, health: 15, points: 15 }) || this;
    }
    return NodeModulesMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/PrintMobEntity.ts":
/*!*******************************************!*\
  !*** ./src/Entity/Mobs/PrintMobEntity.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrintMobEntity: () => (/* binding */ PrintMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var PrintMobEntity = /** @class */ (function (_super) {
    __extends(PrintMobEntity, _super);
    function PrintMobEntity() {
        return _super.call(this, { name: 'print(\'debug\')', width: 32, height: 10, speed: 0.35, damage: 7, health: 0.5, points: 2 }) || this;
    }
    return PrintMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/Mobs/TodoCommentMobEntity.ts":
/*!*************************************************!*\
  !*** ./src/Entity/Mobs/TodoCommentMobEntity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoCommentMobEntity: () => (/* binding */ TodoCommentMobEntity)
/* harmony export */ });
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var TodoCommentMobEntity = /** @class */ (function (_super) {
    __extends(TodoCommentMobEntity, _super);
    function TodoCommentMobEntity() {
        return _super.call(this, { name: 'TODO: fix later', width: 32, height: 10, speed: 0.04, damage: 25, health: 15, points: 8 }) || this;
    }
    return TodoCommentMobEntity;
}(_VariableMobEntity__WEBPACK_IMPORTED_MODULE_0__.VariableMobEntity));



/***/ }),

/***/ "./src/Entity/NpuCore/NpuCoreMobEntity.ts":
/*!************************************************!*\
  !*** ./src/Entity/NpuCore/NpuCoreMobEntity.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NpuCoreMobEntity: () => (/* binding */ NpuCoreMobEntity)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _WorkerEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WorkerEntity */ "./src/Entity/WorkerEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var NpuCoreMobEntity = /** @class */ (function (_super) {
    __extends(NpuCoreMobEntity, _super);
    function NpuCoreMobEntity(x, y) {
        return _super.call(this, x, y, 'npu', 300) || this;
    }
    NpuCoreMobEntity.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.npuIcon;
    };
    return NpuCoreMobEntity;
}(_WorkerEntity__WEBPACK_IMPORTED_MODULE_1__.WorkerEntity));



/***/ }),

/***/ "./src/Entity/NpuCore/NpuCoreProjectileEntity.ts":
/*!*******************************************************!*\
  !*** ./src/Entity/NpuCore/NpuCoreProjectileEntity.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NpuCoreProjectileEntity: () => (/* binding */ NpuCoreProjectileEntity)
/* harmony export */ });
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _ProjectileEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProjectileEntity */ "./src/Entity/ProjectileEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var NpuCoreProjectileEntity = /** @class */ (function (_super) {
    __extends(NpuCoreProjectileEntity, _super);
    function NpuCoreProjectileEntity(x, y, directionX, directionY) {
        var _this = _super.call(this, x, y, directionX, directionY, 0.9, 40, 1.0, 1.0) || this;
        _this.destroyOnCollide = false;
        return _this;
    }
    NpuCoreProjectileEntity.prototype.getSprite = function () {
        return _Sprites__WEBPACK_IMPORTED_MODULE_0__.Sprites.npuProjectile;
    };
    return NpuCoreProjectileEntity;
}(_ProjectileEntity__WEBPACK_IMPORTED_MODULE_1__.ProjectileEntity));



/***/ }),

/***/ "./src/Entity/Player/PlayerActions.ts":
/*!********************************************!*\
  !*** ./src/Entity/Player/PlayerActions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerActions: () => (/* binding */ PlayerActions)
/* harmony export */ });
/* harmony import */ var _libs_Core_Input_Mouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/Core/Input/Mouse */ "./libs/Core/Input/Mouse.ts");
/* harmony import */ var _Actions_Player_UseBroomAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Actions/Player/UseBroomAction */ "./src/Actions/Player/UseBroomAction.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Sprites */ "./src/Sprites.ts");




var PlayerActions = /** @class */ (function () {
    function PlayerActions(actionExecutor) {
        this.actionExecutor = actionExecutor;
        //private broomCooldown = 120;
        //private broomCooldownTimeLeft = 0;
        this.broomAnimationAnimationTime = 26;
        this.broomAnimationAnimationTimeLeft = 0;
    }
    PlayerActions.prototype.tick = function () {
        //if (this.broomCooldownTimeLeft > 0) {
        //    this.broomCooldownTimeLeft--;
        //}
        if (this.broomAnimationAnimationTimeLeft > 0) {
            this.broomAnimationAnimationTimeLeft--;
        }
    };
    PlayerActions.prototype.useBroom = function (x, y) {
        //if (this.broomCooldownTimeLeft > 0) return;
        if (this.broomAnimationAnimationTimeLeft <= 0) {
            this.broomAnimationAnimationTimeLeft = this.broomAnimationAnimationTime;
        }
        //this.broomCooldownTimeLeft = this.broomCooldown;
        this.actionExecutor.execute(new _Actions_Player_UseBroomAction__WEBPACK_IMPORTED_MODULE_1__.UseBroomAction(x, y));
    };
    PlayerActions.prototype.render = function (screen) {
        var mouseX = _libs_Core_Input_Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse.x / _Config__WEBPACK_IMPORTED_MODULE_2__.config.renderScale;
        var mouseY = _libs_Core_Input_Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse.y / _Config__WEBPACK_IMPORTED_MODULE_2__.config.renderScale;
        if (mouseX > _Config__WEBPACK_IMPORTED_MODULE_2__.config.leftUiBarWidth && mouseY < _Config__WEBPACK_IMPORTED_MODULE_2__.config.BottomUiBarHeight) {
            screen.setCursorVisibility(false);
            var sprite = this.broomAnimationAnimationTimeLeft >= (this.broomAnimationAnimationTime / 2) ? _Sprites__WEBPACK_IMPORTED_MODULE_3__.Sprites.broom2 : _Sprites__WEBPACK_IMPORTED_MODULE_3__.Sprites.broom;
            screen.render(sprite, mouseX, mouseY);
        }
        else {
            screen.setCursorVisibility(true);
        }
    };
    return PlayerActions;
}());



/***/ }),

/***/ "./src/Entity/Player/PlayerStats.ts":
/*!******************************************!*\
  !*** ./src/Entity/Player/PlayerStats.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerStats: () => (/* binding */ PlayerStats)
/* harmony export */ });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Config */ "./src/Config.ts");
/* harmony import */ var _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Upgrades/UpgradeType */ "./src/Upgrades/UpgradeType.ts");


var PlayerStats = /** @class */ (function () {
    function PlayerStats() {
    }
    PlayerStats.prototype.initialize = function () {
        var _a;
        this.maxHealth = 100;
        this.health = 100;
        this.score = 0;
        this.points = 0;
        this.wave = 0;
        this.upgradeLevels = (_a = {},
            _a[_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.CpuOverclock] = 1,
            _a[_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.Ram] = 1,
            _a[_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.Broom] = 1,
            _a[_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.CpuThread] = 1,
            _a[_Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.NpuCore] = 1,
            _a);
    };
    PlayerStats.prototype.dealDamage = function (amount) {
        this.health -= amount;
        if (this.isDied()) {
            // TODO: Death sound
        }
    };
    PlayerStats.prototype.addHealth = function (amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    };
    PlayerStats.prototype.getHealth = function () {
        return this.health;
    };
    PlayerStats.prototype.addMaxHealth = function (amount) {
        this.maxHealth += amount;
    };
    PlayerStats.prototype.getMaxHealth = function () {
        return this.maxHealth;
    };
    PlayerStats.prototype.canBuyUpgrade = function (upgrade) {
        var level = this.upgradeLevels[upgrade.upgradeType];
        var cost = upgrade.cost(level);
        return this.points >= cost;
    };
    PlayerStats.prototype.buyUpgrade = function (upgrade) {
        if (!this.canBuyUpgrade(upgrade))
            return false;
        var level = this.upgradeLevels[upgrade.upgradeType];
        var cost = upgrade.cost(level);
        this.removePoints(cost);
        this.giveUpgrade(upgrade);
        // TODO: Upgrades - play sound to let player know
        return true;
    };
    PlayerStats.prototype.giveUpgrade = function (upgrade) {
        var level = this.upgradeLevels[upgrade.upgradeType];
        this.upgradeLevels[upgrade.upgradeType] = level + 1;
        if (upgrade.upgradeType === _Upgrades_UpgradeType__WEBPACK_IMPORTED_MODULE_1__.UpgradeType.Ram) {
            this.maxHealth += _Config__WEBPACK_IMPORTED_MODULE_0__.config.memoryIncreasePerLevel;
            this.health += _Config__WEBPACK_IMPORTED_MODULE_0__.config.memoryIncreasePerLevel;
        }
    };
    PlayerStats.prototype.getUpgradeLevel = function (upgradeType) {
        return this.upgradeLevels[upgradeType];
    };
    PlayerStats.prototype.addScore = function (score) {
        this.score += score;
    };
    PlayerStats.prototype.getScore = function () {
        return this.score;
    };
    PlayerStats.prototype.addPoints = function (amount) {
        this.points += amount;
    };
    PlayerStats.prototype.removePoints = function (amount) {
        this.points -= amount;
    };
    PlayerStats.prototype.getPoints = function () {
        return this.points;
    };
    PlayerStats.prototype.increaseWave = function () {
        this.wave++;
    };
    PlayerStats.prototype.getWave = function () {
        return this.wave;
    };
    PlayerStats.prototype.isDied = function () {
        return this.getHealth() <= 0;
    };
    return PlayerStats;
}());



/***/ }),

/***/ "./src/Entity/ProjectileEntity.ts":
/*!****************************************!*\
  !*** ./src/Entity/ProjectileEntity.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectileEntity: () => (/* binding */ ProjectileEntity)
/* harmony export */ });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _MobEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MobEntity */ "./src/Entity/MobEntity.ts");
/* harmony import */ var _VariableMobEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VariableMobEntity */ "./src/Entity/VariableMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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



var ProjectileEntity = /** @class */ (function (_super) {
    __extends(ProjectileEntity, _super);
    function ProjectileEntity(x, y, directionX, directionY, speed, damage, speedModifier, damageModifier) {
        var _this = _super.call(this, x, y) || this;
        _this.destroyOnCollide = true;
        _this.damage = damage * damageModifier;
        _this.speed = speed * speedModifier;
        _this.directionX = directionX;
        _this.directionY = directionY;
        _this.renderOrder = 9;
        return _this;
    }
    ProjectileEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        var moveX = this.directionX * this.speed;
        var moveY = this.directionY * this.speed;
        this.move(moveX, moveY);
        var screenWidth = (_Config__WEBPACK_IMPORTED_MODULE_0__.config.screenWidth / _Config__WEBPACK_IMPORTED_MODULE_0__.config.renderScale);
        if (this.x < _Config__WEBPACK_IMPORTED_MODULE_0__.config.leftUiBarWidth || this.x > screenWidth || this.y < 0 || this.y > _Config__WEBPACK_IMPORTED_MODULE_0__.config.BottomUiBarHeight) {
            this.removed = true;
        }
    };
    ProjectileEntity.prototype.onCollide = function (entity) {
        if (!(entity instanceof _VariableMobEntity__WEBPACK_IMPORTED_MODULE_2__.VariableMobEntity))
            return;
        var variableMobEntity = entity;
        variableMobEntity.dealDamage(this.damage);
        if (this.destroyOnCollide) {
            this.removed = true;
        }
        else {
            this.damage *= 0.5;
            if (this.damage < 1) {
                this.removed = true;
            }
        }
    };
    return ProjectileEntity;
}(_MobEntity__WEBPACK_IMPORTED_MODULE_1__.MobEntity));



/***/ }),

/***/ "./src/Entity/VariableMobEntity.ts":
/*!*****************************************!*\
  !*** ./src/Entity/VariableMobEntity.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VariableMobEntity: () => (/* binding */ VariableMobEntity)
/* harmony export */ });
/* harmony import */ var _Actions_Entity_DamageRam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/Entity/DamageRam */ "./src/Actions/Entity/DamageRam.ts");
/* harmony import */ var _Actions_Entity_IncreasePoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Actions/Entity/IncreasePoints */ "./src/Actions/Entity/IncreasePoints.ts");
/* harmony import */ var _Actions_Entity_IncreaseScoreAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Actions/Entity/IncreaseScoreAction */ "./src/Actions/Entity/IncreaseScoreAction.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _MobEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MobEntity */ "./src/Entity/MobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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





var VariableMobEntity = /** @class */ (function (_super) {
    __extends(VariableMobEntity, _super);
    function VariableMobEntity(options) {
        var _this = _super.call(this, 0, 0) || this;
        _this.healthBarWidth = 15;
        _this.options = options;
        _this.speed = options.speed;
        _this.maxHealth = options.health;
        _this.health = options.health;
        _this.renderOrder = 1;
        return _this;
    }
    VariableMobEntity.prototype.getSprite = function () {
        return { loaded: true, width: this.options.width, height: this.options.height };
    };
    VariableMobEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.move(-this.speed, 0);
        if (this.x <= _Config__WEBPACK_IMPORTED_MODULE_3__.config.leftUiBarWidth) {
            this.executeAction(new _Actions_Entity_DamageRam__WEBPACK_IMPORTED_MODULE_0__.DamageRamAction(this.options.damage));
            this.removed = true;
            return;
        }
    };
    VariableMobEntity.prototype.setHealthModifier = function (modifier) {
        this.maxHealth *= modifier;
        this.health = this.maxHealth;
    };
    VariableMobEntity.prototype.setSpeedModifier = function (modifier) {
        this.speed *= modifier;
    };
    VariableMobEntity.prototype.render = function (screen) {
        screen.renderRectangle(this.x, this.y, this.getSprite().width, this.getSprite().height, { color: '#f8f8f8', alpha: 0.6 });
        screen.renderText(this.options.name, this.x + 2, this.y + (this.getSprite().height / 2) + 1, { fontColor: '#122285', fontSize: 4, fontWeight: 600 });
        var healthSize = (this.healthBarWidth / this.maxHealth) * this.health;
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, this.healthBarWidth, 1, { color: 'red' });
        screen.renderRectangle(this.x + (this.getSprite().width / 2) - (this.healthBarWidth / 2), this.y - 3, healthSize, 1, { color: 'green' });
    };
    VariableMobEntity.prototype.dealDamage = function (amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.removed = true;
            this.executeAction(new _Actions_Entity_IncreasePoints__WEBPACK_IMPORTED_MODULE_1__.IncreasePointsAction(this.options.points));
            this.executeAction(new _Actions_Entity_IncreaseScoreAction__WEBPACK_IMPORTED_MODULE_2__.IncreaseScoreAction(this.options.damage));
        }
    };
    return VariableMobEntity;
}(_MobEntity__WEBPACK_IMPORTED_MODULE_4__.MobEntity));



/***/ }),

/***/ "./src/Entity/WorkerEntity.ts":
/*!************************************!*\
  !*** ./src/Entity/WorkerEntity.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkerEntity: () => (/* binding */ WorkerEntity)
/* harmony export */ });
/* harmony import */ var _Actions_Entity_WorkerFireProjectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/Entity/WorkerFireProjectile */ "./src/Actions/Entity/WorkerFireProjectile.ts");
/* harmony import */ var _MobEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MobEntity */ "./src/Entity/MobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var WorkerEntity = /** @class */ (function (_super) {
    __extends(WorkerEntity, _super);
    function WorkerEntity(x, y, workerType, attackDelay) {
        var _this = _super.call(this, x, y) || this;
        _this.timeSinceLastAttack = 0;
        _this.speed = 0;
        _this.workerType = workerType;
        _this.attackDelay = attackDelay;
        return _this;
    }
    WorkerEntity.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.executeAction(new _Actions_Entity_WorkerFireProjectile__WEBPACK_IMPORTED_MODULE_0__.WorkerFireProjectileAction(this));
    };
    return WorkerEntity;
}(_MobEntity__WEBPACK_IMPORTED_MODULE_1__.MobEntity));



/***/ }),

/***/ "./src/Keybinds.ts":
/*!*************************!*\
  !*** ./src/Keybinds.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keyBinds: () => (/* binding */ keyBinds)
/* harmony export */ });
/* harmony import */ var _libs_Core_Input_Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/Core/Input/Key */ "./libs/Core/Input/Key.ts");

var keyBinds = {
    pause: new _libs_Core_Input_Key__WEBPACK_IMPORTED_MODULE_0__.Key(['p', 'P', 'Escape']),
    restart: new _libs_Core_Input_Key__WEBPACK_IMPORTED_MODULE_0__.Key([' ']),
};


/***/ }),

/***/ "./src/Level/Level.ts":
/*!****************************!*\
  !*** ./src/Level/Level.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLevel: () => (/* binding */ createLevel)
/* harmony export */ });
/* harmony import */ var _Actions_Level_RenderLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/Level/RenderLevel */ "./src/Actions/Level/RenderLevel.ts");

var Level = /** @class */ (function () {
    function Level(actionExecutor) {
        this.entities = new Array();
        this.actionExecutor = actionExecutor;
    }
    Level.prototype.tick = function () {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.tick();
        }
        this.entities = this.entities.filter(function (e) { return !e.removed; });
    };
    Level.prototype.render = function () {
        this.actionExecutor.execute(new _Actions_Level_RenderLevel__WEBPACK_IMPORTED_MODULE_0__.RenderLevelAction());
    };
    Level.prototype.add = function (entity) {
        entity.onCreate(this.actionExecutor);
        this.entities.push(entity);
    };
    Level.prototype.getEntities = function () {
        return this.entities.filter(function (e) { return !e.removed; });
    };
    return Level;
}());
var createLevel = function (actionExecutor) { return new Level(actionExecutor); };


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Main: () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _libs_Core_Input_KeyHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/Core/Input/KeyHandler */ "./libs/Core/Input/KeyHandler.ts");
/* harmony import */ var _libs_Core_Screen_Screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/Core/Screen/Screen */ "./libs/Core/Screen/Screen.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Config */ "./src/Config.ts");
/* harmony import */ var _Keybinds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Keybinds */ "./src/Keybinds.ts");
/* harmony import */ var _libs_Core_Settings_Settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../libs/Core/Settings/Settings */ "./libs/Core/Settings/Settings.ts");
/* harmony import */ var _libs_Core_Task_TaskManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../libs/Core/Task/TaskManager */ "./libs/Core/Task/TaskManager.ts");
/* harmony import */ var _libs_Core_Action_ActionExecutor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../libs/Core/Action/ActionExecutor */ "./libs/Core/Action/ActionExecutor.ts");
/* harmony import */ var _Actions_Entity_MoveMobEntity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Actions/Entity/MoveMobEntity */ "./src/Actions/Entity/MoveMobEntity.ts");
/* harmony import */ var _Actions_Level_RenderLevel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Actions/Level/RenderLevel */ "./src/Actions/Level/RenderLevel.ts");
/* harmony import */ var _libs_Core_UI_UIManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../libs/Core/UI/UIManager */ "./libs/Core/UI/UIManager.ts");
/* harmony import */ var _libs_Core_Input_MouseHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../libs/Core/Input/MouseHandler */ "./libs/Core/Input/MouseHandler.ts");
/* harmony import */ var _Actions_MouseClickAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Actions/MouseClickAction */ "./src/Actions/MouseClickAction.ts");
/* harmony import */ var _Actions_MouseMovedAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Actions/MouseMovedAction */ "./src/Actions/MouseMovedAction.ts");
/* harmony import */ var _Actions_MouseDragAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Actions/MouseDragAction */ "./src/Actions/MouseDragAction.ts");
/* harmony import */ var _Actions_Level_GenerateLevel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Actions/Level/GenerateLevel */ "./src/Actions/Level/GenerateLevel.ts");
/* harmony import */ var _Entity_Player_PlayerStats__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Entity/Player/PlayerStats */ "./src/Entity/Player/PlayerStats.ts");
/* harmony import */ var _UITypes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./UITypes */ "./src/UITypes.ts");
/* harmony import */ var _UI_BottomUi__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./UI/BottomUi */ "./src/UI/BottomUi.ts");
/* harmony import */ var _Tasks_EnemyWaveTask__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Tasks/EnemyWaveTask */ "./src/Tasks/EnemyWaveTask.ts");
/* harmony import */ var _Actions_Entity_DamageRam__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Actions/Entity/DamageRam */ "./src/Actions/Entity/DamageRam.ts");
/* harmony import */ var _Actions_Upgrades_BuyPlaceableUpgrade__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Actions/Upgrades/BuyPlaceableUpgrade */ "./src/Actions/Upgrades/BuyPlaceableUpgrade.ts");
/* harmony import */ var _Actions_Entity_WorkerFireProjectile__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Actions/Entity/WorkerFireProjectile */ "./src/Actions/Entity/WorkerFireProjectile.ts");
/* harmony import */ var _Actions_Entity_IncreasePoints__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Actions/Entity/IncreasePoints */ "./src/Actions/Entity/IncreasePoints.ts");
/* harmony import */ var _Actions_Entity_IncreaseScoreAction__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Actions/Entity/IncreaseScoreAction */ "./src/Actions/Entity/IncreaseScoreAction.ts");
/* harmony import */ var _Entity_Player_PlayerActions__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Entity/Player/PlayerActions */ "./src/Entity/Player/PlayerActions.ts");
/* harmony import */ var _Actions_Player_UseBroomAction__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Actions/Player/UseBroomAction */ "./src/Actions/Player/UseBroomAction.ts");
/* harmony import */ var _Tasks_ItemSpawnTask__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Tasks/ItemSpawnTask */ "./src/Tasks/ItemSpawnTask.ts");
/* harmony import */ var _Actions_Level_ClearLevel__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Actions/Level/ClearLevel */ "./src/Actions/Level/ClearLevel.ts");
var __assign = (undefined && undefined.__assign) || function () {
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




























globalThis.settings = _libs_Core_Settings_Settings__WEBPACK_IMPORTED_MODULE_4__.settings;
var Main = /** @class */ (function () {
    function Main() {
        this.lastFrameTimeMs = 0;
        this.timestep = 1000 / 60;
        this.delta = 0;
        this.frames = 0;
        this.last = new Date().getTime();
        this.ticks = 0;
        this.actionExecutor = (0,_libs_Core_Action_ActionExecutor__WEBPACK_IMPORTED_MODULE_6__.createActionExecutor)();
        this.playerStats = new _Entity_Player_PlayerStats__WEBPACK_IMPORTED_MODULE_15__.PlayerStats();
        this.playerActions = new _Entity_Player_PlayerActions__WEBPACK_IMPORTED_MODULE_24__.PlayerActions(this.actionExecutor);
        this.screen = (0,_libs_Core_Screen_Screen__WEBPACK_IMPORTED_MODULE_1__.createScreen2D)(_Config__WEBPACK_IMPORTED_MODULE_2__.config.renderScale);
        this.taskManager = (0,_libs_Core_Task_TaskManager__WEBPACK_IMPORTED_MODULE_5__.createTaskManager)();
        this.uiManager = (0,_libs_Core_UI_UIManager__WEBPACK_IMPORTED_MODULE_9__.createUIManager)();
        this.addUI();
        this.registerActions();
        this.addInputListeners();
        this.initialize();
        this.screen.setSize(_Config__WEBPACK_IMPORTED_MODULE_2__.config.screenWidth, _Config__WEBPACK_IMPORTED_MODULE_2__.config.screenHeight);
        this.run(0);
    }
    Main.prototype.initialize = function () {
        this.playerStats.initialize();
        this.level = this.actionExecutor.execute(new _Actions_Level_GenerateLevel__WEBPACK_IMPORTED_MODULE_14__.GenerateLevelAction());
        this.taskManager.clear();
        this.taskManager.add(new _Tasks_EnemyWaveTask__WEBPACK_IMPORTED_MODULE_18__.EnemyWaveTask(this.level, this.playerStats));
        this.taskManager.add(new _Tasks_ItemSpawnTask__WEBPACK_IMPORTED_MODULE_26__.ItemSpawnTask(this.level));
    };
    Main.prototype.registerActions = function () {
        var _this = this;
        this.actionExecutor.register(_Actions_Entity_MoveMobEntity__WEBPACK_IMPORTED_MODULE_7__.MoveMobEntityAction.name, function () { return new _Actions_Entity_MoveMobEntity__WEBPACK_IMPORTED_MODULE_7__.MoveMobEntityActionHandler(_this.level); });
        this.actionExecutor.register(_Actions_Entity_DamageRam__WEBPACK_IMPORTED_MODULE_19__.DamageRamAction.name, function () { return new _Actions_Entity_DamageRam__WEBPACK_IMPORTED_MODULE_19__.DamageRamActionHandler(_this.playerStats); });
        this.actionExecutor.register(_Actions_Level_RenderLevel__WEBPACK_IMPORTED_MODULE_8__.RenderLevelAction.name, function () { return new _Actions_Level_RenderLevel__WEBPACK_IMPORTED_MODULE_8__.RenderLevelActionHandler(_this.level, _this.screen); });
        this.actionExecutor.register(_Actions_MouseClickAction__WEBPACK_IMPORTED_MODULE_11__.MouseClickAction.name, function () { return new _Actions_MouseClickAction__WEBPACK_IMPORTED_MODULE_11__.MouseClickActionHandler(_this.uiManager, _this.playerActions, _this.playerStats); });
        this.actionExecutor.register(_Actions_MouseMovedAction__WEBPACK_IMPORTED_MODULE_12__.MouseMoveAction.name, function () { return new _Actions_MouseMovedAction__WEBPACK_IMPORTED_MODULE_12__.MouseMoveActionHandler(_this.uiManager); });
        this.actionExecutor.register(_Actions_MouseDragAction__WEBPACK_IMPORTED_MODULE_13__.MouseDragAction.name, function () { return new _Actions_MouseDragAction__WEBPACK_IMPORTED_MODULE_13__.MouseDragActionHandler(_this.uiManager); });
        this.actionExecutor.register(_Actions_Level_GenerateLevel__WEBPACK_IMPORTED_MODULE_14__.GenerateLevelAction.name, function () { return new _Actions_Level_GenerateLevel__WEBPACK_IMPORTED_MODULE_14__.GenerateLevelActionHandler(_this.actionExecutor); });
        this.actionExecutor.register(_Actions_Upgrades_BuyPlaceableUpgrade__WEBPACK_IMPORTED_MODULE_20__.BuyPlaceableAction.name, function () { return new _Actions_Upgrades_BuyPlaceableUpgrade__WEBPACK_IMPORTED_MODULE_20__.BuyPlaceableActionHandler(_this.playerStats, _this.level, _this.screen); });
        this.actionExecutor.register(_Actions_Entity_WorkerFireProjectile__WEBPACK_IMPORTED_MODULE_21__.WorkerFireProjectileAction.name, function () { return new _Actions_Entity_WorkerFireProjectile__WEBPACK_IMPORTED_MODULE_21__.WorkerFireProjectileActionHandler(_this.level, _this.playerStats); });
        this.actionExecutor.register(_Actions_Entity_IncreasePoints__WEBPACK_IMPORTED_MODULE_22__.IncreasePointsAction.name, function () { return new _Actions_Entity_IncreasePoints__WEBPACK_IMPORTED_MODULE_22__.IncreasePointsActionHandler(_this.playerStats); });
        this.actionExecutor.register(_Actions_Entity_IncreaseScoreAction__WEBPACK_IMPORTED_MODULE_23__.IncreaseScoreAction.name, function () { return new _Actions_Entity_IncreaseScoreAction__WEBPACK_IMPORTED_MODULE_23__.IncreaseScoreActionHandler(_this.playerStats); });
        this.actionExecutor.register(_Actions_Player_UseBroomAction__WEBPACK_IMPORTED_MODULE_25__.UseBroomAction.name, function () { return new _Actions_Player_UseBroomAction__WEBPACK_IMPORTED_MODULE_25__.UseBroomActionHandler(_this.level, _this.playerStats); });
        this.actionExecutor.register(_Actions_Level_ClearLevel__WEBPACK_IMPORTED_MODULE_27__.ClearLevelAction.name, function () { return new _Actions_Level_ClearLevel__WEBPACK_IMPORTED_MODULE_27__.ClearLevelActionHandler(_this.level); });
    };
    Main.prototype.addInputListeners = function () {
        var _this = this;
        _libs_Core_Input_KeyHandler__WEBPACK_IMPORTED_MODULE_0__.KeyHandler.init(_Keybinds__WEBPACK_IMPORTED_MODULE_3__.keyBinds);
        _libs_Core_Input_MouseHandler__WEBPACK_IMPORTED_MODULE_10__.MouseHandler.bind('click', function (x, y) { return _this.actionExecutor.execute(new _Actions_MouseClickAction__WEBPACK_IMPORTED_MODULE_11__.MouseClickAction(x, y)); });
        _libs_Core_Input_MouseHandler__WEBPACK_IMPORTED_MODULE_10__.MouseHandler.bind('mousemove', function (x, y) { return _this.actionExecutor.execute(new _Actions_MouseMovedAction__WEBPACK_IMPORTED_MODULE_12__.MouseMoveAction(x, y)); });
        _libs_Core_Input_MouseHandler__WEBPACK_IMPORTED_MODULE_10__.MouseHandler.bind('mousedrag', function (x, y) { return _this.actionExecutor.execute(new _Actions_MouseDragAction__WEBPACK_IMPORTED_MODULE_13__.MouseDragAction(x, y)); });
    };
    Main.prototype.addUI = function () {
        this.uiManager.add(_UITypes__WEBPACK_IMPORTED_MODULE_16__.UITypes.Bottom, new _UI_BottomUi__WEBPACK_IMPORTED_MODULE_17__.BottomUi(this.playerStats, this.actionExecutor));
        this.uiManager.toggle(_UITypes__WEBPACK_IMPORTED_MODULE_16__.UITypes.Bottom);
    };
    Main.prototype.run = function (timestamp) {
        var _this = this;
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
        while (this.delta >= this.timestep) {
            this.delta -= this.timestep;
            this.ticks++;
            this.tick();
        }
        this.render();
        this.frames++;
        var current = new Date().getTime();
        if (current - this.last >= 3000) {
            this.last = current;
            console.log("Ticks: ".concat(this.ticks / 3, ", FPS: ").concat(this.frames / 3));
            this.frames = 0;
            this.ticks = 0;
        }
        requestAnimationFrame(function (timestamp) { return _this.run(timestamp); });
    };
    Main.prototype.tick = function () {
        if (_libs_Core_Settings_Settings__WEBPACK_IMPORTED_MODULE_4__.settings.menu() !== 'game')
            return;
        if (_Keybinds__WEBPACK_IMPORTED_MODULE_3__.keyBinds.pause.isPressed && !this.playerStats.isDied()) {
            _Keybinds__WEBPACK_IMPORTED_MODULE_3__.keyBinds.pause.release();
            Main.paused = !Main.paused;
        }
        if (Main.paused)
            return;
        if (this.playerStats.isDied()) {
            if (_Keybinds__WEBPACK_IMPORTED_MODULE_3__.keyBinds.restart.isPressed) {
                _Keybinds__WEBPACK_IMPORTED_MODULE_3__.keyBinds.restart.release();
                this.initialize();
            }
            return;
        }
        this.playerActions.tick();
        this.level.tick();
        this.taskManager.tick();
        this.uiManager.tick();
    };
    Main.prototype.render = function () {
        if (_libs_Core_Settings_Settings__WEBPACK_IMPORTED_MODULE_4__.settings.menu() !== 'game')
            return;
        this.level.render();
        this.playerActions.render(this.screen);
        this.uiManager.render(this.screen);
        if (this.playerStats.isDied()) {
            var textOptions = { fontSize: 6, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' };
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Memory overload!', 0, (this.screen.getSize().height / 2) - 23, __assign(__assign({}, textOptions), { fontSize: 9 }));
            this.screen.renderText("MB's cleaned: ".concat(this.playerStats.getScore()), 0, (this.screen.getSize().height / 2) - 12, __assign({}, textOptions));
            this.screen.renderText('Press Space to try again', 0, (this.screen.getSize().height / 2) - 1, __assign({}, textOptions));
            return;
        }
        if (Main.paused) {
            this.screen.renderRectangle(0, 0, this.screen.getSize().width, this.screen.getSize().height, { color: '#000000', alpha: 0.4 });
            this.screen.renderText('Game paused', 0, (this.screen.getSize().height / 2) - 9, { fontSize: 9, fontColor: '#ffffff', width: this.screen.getSize().width, textAlign: 'center' });
        }
    };
    Main.paused = false;
    return Main;
}());

new Main();


/***/ }),

/***/ "./src/Sprites.ts":
/*!************************!*\
  !*** ./src/Sprites.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sprites: () => (/* binding */ Sprites)
/* harmony export */ });
/* harmony import */ var _libs_Core_Screen_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/Core/Screen/Sprite */ "./libs/Core/Screen/Sprite.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Config */ "./src/Config.ts");


var Sprites = /** @class */ (function () {
    function Sprites() {
    }
    Sprites.ram = loadImage('ram.png');
    Sprites.ramIcon = loadImage('ram_icon.png');
    Sprites.overclockIcon = loadImage('overclock_icon.png');
    Sprites.npuIcon = loadImage('npu_icon.png');
    Sprites.npuProjectile = loadImage('npu_projectile2.png');
    Sprites.cpuIcon = loadImage('cpu_icon.png');
    Sprites.cpuProjectile = loadImage('cpu_projectile.png');
    Sprites.broom = loadImage('broom.png');
    Sprites.broom2 = loadImage('broom2.png');
    Sprites.background = loadImage('motherboard.png');
    Sprites.itemPlusIcon = loadImage('plus.png');
    Sprites.itemUpgradeIcon = loadImage('item_upgrade_icon.png');
    Sprites.restartIcon = loadImage('restart.png');
    return Sprites;
}());

function loadImage(image) {
    return new _libs_Core_Screen_Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite("".concat(_Config__WEBPACK_IMPORTED_MODULE_1__.config.imageBasePath, "/").concat(image));
}


/***/ }),

/***/ "./src/Tasks/EnemyWaveTask.ts":
/*!************************************!*\
  !*** ./src/Tasks/EnemyWaveTask.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnemyWaveTask: () => (/* binding */ EnemyWaveTask)
/* harmony export */ });
/* harmony import */ var _libs_Core_Task_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Task/Task */ "./libs/Core/Task/Task.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_Mobs_ArrayMobEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Entity/Mobs/ArrayMobEntity */ "./src/Entity/Mobs/ArrayMobEntity.ts");
/* harmony import */ var _Entity_Mobs_ForLoopMobEntity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Entity/Mobs/ForLoopMobEntity */ "./src/Entity/Mobs/ForLoopMobEntity.ts");
/* harmony import */ var _Entity_Mobs_HashMapMobEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Entity/Mobs/HashMapMobEntity */ "./src/Entity/Mobs/HashMapMobEntity.ts");
/* harmony import */ var _Entity_Mobs_HelloWorldMobEntity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Entity/Mobs/HelloWorldMobEntity */ "./src/Entity/Mobs/HelloWorldMobEntity.ts");
/* harmony import */ var _Entity_Mobs_NodeModulesMobEntity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Entity/Mobs/NodeModulesMobEntity */ "./src/Entity/Mobs/NodeModulesMobEntity.ts");
/* harmony import */ var _Entity_Mobs_PrintMobEntity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Entity/Mobs/PrintMobEntity */ "./src/Entity/Mobs/PrintMobEntity.ts");
/* harmony import */ var _Entity_Mobs_TodoCommentMobEntity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Entity/Mobs/TodoCommentMobEntity */ "./src/Entity/Mobs/TodoCommentMobEntity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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









var baseSpawnInterval = 280;
var minSpawnInterval = 45;
var baseSpawnCount = 2;
var maxSpawnCount = 7;
var spawnableEnemies = [
    { weightModifier: 1.25, spawn: function () { return new _Entity_Mobs_HelloWorldMobEntity__WEBPACK_IMPORTED_MODULE_5__.HelloWorldMobEntity(); } },
    { weightModifier: 0.7, spawn: function () { return new _Entity_Mobs_ArrayMobEntity__WEBPACK_IMPORTED_MODULE_2__.ArrayMobEntity(); } },
    { weightModifier: 0.35, spawn: function () { return new _Entity_Mobs_TodoCommentMobEntity__WEBPACK_IMPORTED_MODULE_8__.TodoCommentMobEntity(); } },
    { weightModifier: 0.23, spawn: function () { return new _Entity_Mobs_ForLoopMobEntity__WEBPACK_IMPORTED_MODULE_3__.ForLoopMobEntity(); } },
    { weightModifier: 0.5, spawn: function () { return new _Entity_Mobs_HashMapMobEntity__WEBPACK_IMPORTED_MODULE_4__.HashMapMobEntity(); } },
    { weightModifier: 0.4, spawn: function () { return new _Entity_Mobs_PrintMobEntity__WEBPACK_IMPORTED_MODULE_7__.PrintMobEntity(); } },
    { weightModifier: 0.024, spawn: function () { return new _Entity_Mobs_NodeModulesMobEntity__WEBPACK_IMPORTED_MODULE_6__.NodeModulesMobEntity(); } }
];
var EnemyWaveTask = /** @class */ (function (_super) {
    __extends(EnemyWaveTask, _super);
    function EnemyWaveTask(level, playerStats) {
        var _this = _super.call(this, 1, true, 'waves') || this;
        _this.level = level;
        _this.playerStats = playerStats;
        _this.ticksPassed = 0;
        _this.nextSpawnTicks = 20;
        return _this;
    }
    EnemyWaveTask.prototype.execute = function () {
        this.ticksPassed++;
        if (this.ticksPassed < this.nextSpawnTicks)
            return;
        var secondsPassed = this.ticksPassed / 60;
        var intervalReduction = Math.floor(secondsPassed / 20) * 4;
        var clampedInterval = Math.max(minSpawnInterval, baseSpawnInterval - intervalReduction);
        // Add randomness
        var randomFactor = 1 + (Math.random() * 0.4 - 0.2);
        var spawnInterval = Math.floor(clampedInterval * randomFactor);
        var scaledCount = baseSpawnCount + Math.floor(secondsPassed / 20);
        var clampedCount = Math.min(scaledCount, maxSpawnCount);
        // Add randomness
        var randomCount = Math.max(2, clampedCount + Math.floor(Math.random() * 3) - 2);
        for (var i = 0; i < randomCount; i++) {
            var entity = this.getEntityToSpawn();
            var xOffset = Math.random() * (450 * entity.getSpeed());
            var x = (_Config__WEBPACK_IMPORTED_MODULE_1__.config.screenWidth / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale) + xOffset;
            var y = 5 + (Math.random() * (_Config__WEBPACK_IMPORTED_MODULE_1__.config.BottomUiBarHeight - 10 - entity.getSprite().height));
            var healthModifier = 1 + ((this.ticksPassed) * 0.0003);
            var speedModifier = 1 + ((this.ticksPassed) * 0.00006);
            entity.teleport(x, y);
            entity.setHealthModifier(healthModifier);
            entity.setSpeedModifier(speedModifier);
            this.level.add(entity);
        }
        this.nextSpawnTicks = this.ticksPassed + spawnInterval;
    };
    EnemyWaveTask.prototype.getEntityToSpawn = function () {
        var maxIndex = Math.min(this.ticksPassed / 600, spawnableEnemies.length);
        var weights = [];
        var difficultyProgress = Math.min(this.ticksPassed / 30000, 1);
        for (var i = 0; i < maxIndex; i++) {
            var earlyWeight = 1 / (i + 1);
            var lateWeight = (i + 1);
            var weightModifierIncreaser = (i * ((this.ticksPassed * 1.2) * 0.000005));
            var weight = (earlyWeight * (1 - difficultyProgress) + lateWeight * difficultyProgress * spawnableEnemies[i].weightModifier) + weightModifierIncreaser;
            weights.push(weight);
        }
        var totalWeight = weights.reduce(function (sum, w) { return sum + w; }, 0);
        var random = Math.random() * totalWeight;
        var cumulative = 0;
        for (var i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return spawnableEnemies[i].spawn();
            }
        }
        return spawnableEnemies[0].spawn();
    };
    return EnemyWaveTask;
}(_libs_Core_Task_Task__WEBPACK_IMPORTED_MODULE_0__.Task));



/***/ }),

/***/ "./src/Tasks/ItemSpawnTask.ts":
/*!************************************!*\
  !*** ./src/Tasks/ItemSpawnTask.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemSpawnTask: () => (/* binding */ ItemSpawnTask)
/* harmony export */ });
/* harmony import */ var _libs_Core_Task_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/Task/Task */ "./libs/Core/Task/Task.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _Entity_Items_CpuOverclockItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Entity/Items/CpuOverclockItem */ "./src/Entity/Items/CpuOverclockItem.ts");
/* harmony import */ var _Entity_Items_RamRepairItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Entity/Items/RamRepairItem */ "./src/Entity/Items/RamRepairItem.ts");
/* harmony import */ var _Entity_Items_RestartItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Entity/Items/RestartItem */ "./src/Entity/Items/RestartItem.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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





var baseItemSpawnRateInSeconds = 25;
var randomItemSpawnRateInSeconds = 15;
var itemSpawns = [
    function (x, y) { return new _Entity_Items_RamRepairItem__WEBPACK_IMPORTED_MODULE_3__.RamRepairItem(x, y); },
];
var rareItemSpawns = [
    function (x, y) { return new _Entity_Items_CpuOverclockItem__WEBPACK_IMPORTED_MODULE_2__.CpuOverclockItem(x, y); },
    function (x, y) { return new _Entity_Items_RestartItem__WEBPACK_IMPORTED_MODULE_4__.RestartItem(x, y); },
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
        var xRange = (_Config__WEBPACK_IMPORTED_MODULE_1__.config.screenWidth / _Config__WEBPACK_IMPORTED_MODULE_1__.config.renderScale) - _Config__WEBPACK_IMPORTED_MODULE_1__.config.leftUiBarWidth - 14;
        var yRange = _Config__WEBPACK_IMPORTED_MODULE_1__.config.BottomUiBarHeight - 14;
        var x = Math.random() * xRange + 7 + _Config__WEBPACK_IMPORTED_MODULE_1__.config.leftUiBarWidth;
        var y = Math.random() * yRange + 7;
        var tableRoll = Math.random() * 2;
        var itemTable = tableRoll <= 1 ? rareItemSpawns : itemSpawns;
        var itemRoll = Math.floor(Math.random() * itemTable.length);
        var item = itemTable[itemRoll](x, y);
        this.level.add(item);
        this.spawnItemInSeconds = this.getNextItemSpawnInSeconds();
    };
    return ItemSpawnTask;
}(_libs_Core_Task_Task__WEBPACK_IMPORTED_MODULE_0__.Task));



/***/ }),

/***/ "./src/UI/BottomUi.ts":
/*!****************************!*\
  !*** ./src/UI/BottomUi.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BottomUi: () => (/* binding */ BottomUi)
/* harmony export */ });
/* harmony import */ var _libs_Core_UI_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/Core/UI/UI */ "./libs/Core/UI/UI.ts");
/* harmony import */ var _libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/Core/Util/Maths */ "./libs/Core/Util/Maths.ts");
/* harmony import */ var _Actions_Upgrades_BuyPlaceableUpgrade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Actions/Upgrades/BuyPlaceableUpgrade */ "./src/Actions/Upgrades/BuyPlaceableUpgrade.ts");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Main */ "./src/Main.ts");
/* harmony import */ var _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Upgrades/Upgrades */ "./src/Upgrades/Upgrades.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
var __assign = (undefined && undefined.__assign) || function () {
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






var BottomUi = /** @class */ (function (_super) {
    __extends(BottomUi, _super);
    function BottomUi(playerStats, actionExecutor) {
        var _this = _super.call(this) || this;
        _this.playerStats = playerStats;
        _this.actionExecutor = actionExecutor;
        _this.buyableUpgrades = _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__.Upgrades.getUpgrades().filter(function (u) { return !u.isPlaceable; });
        _this.placeableUpgrades = _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__.Upgrades.getUpgrades().filter(function (u) { return u.isPlaceable; });
        _this.upgradeOffsetX = 18;
        _this.placeableUpgradeOffsetX = 3;
        _this.getBaseUpgradePosition = function () { return ({ x: 79, y: _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 8, width: 15, height: 15 }); };
        return _this;
    }
    BottomUi.prototype.getPosition = function () {
        return { x: 0, y: _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, width: _Config__WEBPACK_IMPORTED_MODULE_3__.config.screenWidth, height: _Config__WEBPACK_IMPORTED_MODULE_3__.config.screenHeight - _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.render = function (screen) {
        var _this = this;
        var _a = screen.getSize(), width = _a.width, height = _a.height;
        var textOptions = { fontColor: '#ffffff', fontSize: 4, fontWeight: 600 };
        screen.renderRectangle(0, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, width, height - _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, { color: '#000000' });
        screen.renderLine(0, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, width, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, 0.5, '#ffffff');
        // Health bar
        screen.renderRectangle(2.5, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 9.5, 71, 11, { color: '#ffffff' });
        screen.renderRectangle(3, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 10, 70, 10, { color: 'red' });
        var healthWidth = (70 / this.playerStats.getMaxHealth()) * this.playerStats.getHealth();
        screen.renderRectangle(3, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 10, healthWidth, 10, { color: 'green' });
        screen.renderText("Unused memory: ".concat(this.playerStats.getHealth(), " MB"), 3, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 16.3, __assign(__assign({}, textOptions), { width: 70, textAlign: 'center' }));
        // Score
        screen.renderText("MB's cleaned: ".concat(this.playerStats.getScore()), 2, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 5, textOptions);
        screen.renderText("Points: ".concat(this.playerStats.getPoints()), 40, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: 33.5, textAlign: 'right' }));
        // Labels
        var buyablesWidth = this.upgradeOffsetX * this.buyableUpgrades.length;
        screen.renderText('Upgrades', 79, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: buyablesWidth, textAlign: 'center' }));
        screen.renderText('Workers', 79 + buyablesWidth + this.placeableUpgradeOffsetX, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 5, __assign(__assign({}, textOptions), { width: this.upgradeOffsetX * this.placeableUpgrades.length, textAlign: 'center' }));
        // Dividers
        screen.renderLine(76, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, 76, height, 0.5, '#ffffff');
        screen.renderLine(79 + buyablesWidth, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, 79 + buyablesWidth, height, 0.5, '#ffffff');
        // Upgrades
        _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__.Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            screen.renderRectangle(79 + xOffset, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 8, 15, 15, { color: '#353535', filled: true });
            screen.render(upgrade.icon, 81 + xOffset, _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight + 10);
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
        if (_Main__WEBPACK_IMPORTED_MODULE_4__.Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        if (this.draggingUpgrade) {
            var buyPlaceableAction = new _Actions_Upgrades_BuyPlaceableUpgrade__WEBPACK_IMPORTED_MODULE_2__.BuyPlaceableAction(this.draggingUpgrade, this.mouseX, this.mouseY);
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
        if (_Main__WEBPACK_IMPORTED_MODULE_4__.Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        this.selectedUpgrade = undefined;
        if (this.draggingUpgrade)
            return;
        var upgradePosition = this.getBaseUpgradePosition();
        _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__.Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            if (_libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__.Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
                _this.selectedUpgrade = upgrade;
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BottomUi.prototype.drag = function (x, y) {
        var _this = this;
        if (_Main__WEBPACK_IMPORTED_MODULE_4__.Main.paused || this.playerStats.isDied()) {
            this.clear();
            return;
        }
        if (!this.selectedUpgrade)
            return;
        var upgradePosition = this.getBaseUpgradePosition();
        _Upgrades_Upgrades__WEBPACK_IMPORTED_MODULE_5__.Upgrades.getUpgrades().forEach(function (upgrade, index) {
            var xOffset = (_this.upgradeOffsetX * index) + (upgrade.isPlaceable ? _this.placeableUpgradeOffsetX : 0);
            if (_this.selectedUpgrade && upgrade.upgradeType === _this.selectedUpgrade.upgradeType && !_libs_Core_Util_Maths__WEBPACK_IMPORTED_MODULE_1__.Maths.intersects(upgradePosition.x + xOffset, upgradePosition.y - _Config__WEBPACK_IMPORTED_MODULE_3__.config.BottomUiBarHeight, upgradePosition.width, upgradePosition.height, x, y, 1, 1)) {
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
}(_libs_Core_UI_UI__WEBPACK_IMPORTED_MODULE_0__.UI));



/***/ }),

/***/ "./src/UITypes.ts":
/*!************************!*\
  !*** ./src/UITypes.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UITypes: () => (/* binding */ UITypes)
/* harmony export */ });
var UITypes;
(function (UITypes) {
    UITypes["Bottom"] = "bottom";
})(UITypes || (UITypes = {}));


/***/ }),

/***/ "./src/Upgrades/Upgrade.ts":
/*!*********************************!*\
  !*** ./src/Upgrades/Upgrade.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Upgrade: () => (/* binding */ Upgrade)
/* harmony export */ });
var Upgrade = /** @class */ (function () {
    function Upgrade(upgradeType, name, description, icon, isPlaceable, cost) {
        this.upgradeType = upgradeType;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.isPlaceable = isPlaceable;
        this.cost = cost;
    }
    return Upgrade;
}());



/***/ }),

/***/ "./src/Upgrades/UpgradeType.ts":
/*!*************************************!*\
  !*** ./src/Upgrades/UpgradeType.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UpgradeType: () => (/* binding */ UpgradeType)
/* harmony export */ });
var UpgradeType;
(function (UpgradeType) {
    UpgradeType[UpgradeType["CpuOverclock"] = 0] = "CpuOverclock";
    UpgradeType[UpgradeType["CpuThread"] = 1] = "CpuThread";
    UpgradeType[UpgradeType["Broom"] = 2] = "Broom";
    UpgradeType[UpgradeType["Ram"] = 3] = "Ram";
    UpgradeType[UpgradeType["NpuCore"] = 4] = "NpuCore";
})(UpgradeType || (UpgradeType = {}));


/***/ }),

/***/ "./src/Upgrades/Upgrades.ts":
/*!**********************************!*\
  !*** ./src/Upgrades/Upgrades.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Upgrades: () => (/* binding */ Upgrades)
/* harmony export */ });
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config */ "./src/Config.ts");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Sprites */ "./src/Sprites.ts");
/* harmony import */ var _Upgrade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Upgrade */ "./src/Upgrades/Upgrade.ts");
/* harmony import */ var _UpgradeType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UpgradeType */ "./src/Upgrades/UpgradeType.ts");




var Upgrades = /** @class */ (function () {
    function Upgrades() {
    }
    Upgrades.getUpgrades = function () {
        return [
            this.cpuOverclock,
            this.ram,
            this.broom,
            this.cpu,
            this.npu,
        ];
    };
    // Buyables
    Upgrades.cpuOverclock = new _Upgrade__WEBPACK_IMPORTED_MODULE_2__.Upgrade(_UpgradeType__WEBPACK_IMPORTED_MODULE_3__.UpgradeType.CpuOverclock, 'CPU Overclock', "+".concat(_Config__WEBPACK_IMPORTED_MODULE_0__.config.cpuThreadModifierPerLevelPercentage, "% dmg/speed"), _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.overclockIcon, false, function (level) { return 25 + (level * 15); });
    Upgrades.ram = new _Upgrade__WEBPACK_IMPORTED_MODULE_2__.Upgrade(_UpgradeType__WEBPACK_IMPORTED_MODULE_3__.UpgradeType.Ram, 'RAM', "+".concat(_Config__WEBPACK_IMPORTED_MODULE_0__.config.memoryIncreasePerLevel, "MB memory"), _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.ramIcon, false, function (level) { return 40 + (level * 10); });
    Upgrades.broom = new _Upgrade__WEBPACK_IMPORTED_MODULE_2__.Upgrade(_UpgradeType__WEBPACK_IMPORTED_MODULE_3__.UpgradeType.Broom, 'Broom', "+".concat(_Config__WEBPACK_IMPORTED_MODULE_0__.config.broomDamageIncreasePerLevelPercentage, "% sweep dmg"), _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.broom, false, function (level) { return 10 + (level * 20); });
    // Placeables
    Upgrades.cpu = new _Upgrade__WEBPACK_IMPORTED_MODULE_2__.Upgrade(_UpgradeType__WEBPACK_IMPORTED_MODULE_3__.UpgradeType.CpuThread, 'CPU Thread', 'Placeable turret', _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.cpuIcon, true, function (level) { return 10 + (level * 20); });
    Upgrades.npu = new _Upgrade__WEBPACK_IMPORTED_MODULE_2__.Upgrade(_UpgradeType__WEBPACK_IMPORTED_MODULE_3__.UpgradeType.NpuCore, 'NPU Core', 'Placeable turret', _Sprites__WEBPACK_IMPORTED_MODULE_1__.Sprites.npuIcon, true, function (level) { return 80 + (level * 30); });
    return Upgrades;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Main.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=game.js.map