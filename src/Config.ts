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
    cpuThreadDamageModifierPerLevelPercentage: 25,
    cpuThreadSpeedModifierPerLevelPercentage: 10,
    memoryIncreasePerLevel: 10,
    getCpuThreadDamageModifier: (level: number) => (config.cpuThreadDamageModifierPerLevelPercentage / 100) * level + 1,
    getCpuThreadSpeedModifier: (level: number) => (config.cpuThreadSpeedModifierPerLevelPercentage / 100) * level + 1,
}