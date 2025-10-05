var screenHeight = 600;
var renderScale = 3;
export var config = {
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
//# sourceMappingURL=Config.js.map