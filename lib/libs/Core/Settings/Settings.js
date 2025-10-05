export var settings = {
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
//# sourceMappingURL=Settings.js.map