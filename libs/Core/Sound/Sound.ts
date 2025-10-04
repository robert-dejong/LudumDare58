import { settings } from "../Settings/Settings";
import { ISound } from "./ISound";

class Sound implements ISound {
    private clip: HTMLAudioElement;
    private loaded: boolean;

    constructor(path: string) {
        this.clip = new Audio(path);
        
        this.clip.oncanplay = () => {
            this.loaded = true;
        }
    }

    public play(): void {
        if (!this.loaded || settings.isMuted()) return;
        
        this.clip.play();
    }
}

export const createSound = (path: string) => new Sound(path);