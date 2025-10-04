type Difficulty = 'normal' | 'easy';
type Menu = 'mainmenu' | 'settings' | 'game';

export const settings = {
    isMuted: (): boolean => window['isMuted'] ?? false,
    difficulty: (): Difficulty => window['difficulty'] ?? 'normal',
    menu: (): Menu => window['gamemenu'] ?? 'mainmenu',
    
    setMuted: (isMuted: boolean): void => {
        window['isMuted'] = isMuted;
    },

    setDifficulty: (difficulty: Difficulty): void => {
        window['difficulty'] = difficulty;
    },

    setMenu: (menu: Menu): void => {
        window['gamemenu'] = menu;
    }
}