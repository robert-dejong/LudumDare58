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
    threadDamageModifierPerLevelPercentage: 25,
    threadSpeedModifierPerLevelPercentage: 10,
    memoryIncreasePerLevel: 10,
    getThreadDamageModifier: (level: number) => (config.threadDamageModifierPerLevelPercentage / 100) * level + 1,
    getThreadSpeedModifier: (level: number) => (config.threadSpeedModifierPerLevelPercentage / 100) * level + 1,
}