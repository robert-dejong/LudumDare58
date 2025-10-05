const screenHeight = 600;
const renderScale = 3;

export const config = {
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
    getBroomDamageModifier: (level: number) => (config.broomDamageIncreasePerLevelPercentage / 100) * level + 1,
    getCpuThreadModifier: (level: number) => (config.cpuThreadModifierPerLevelPercentage / 100) * level + 1,
}