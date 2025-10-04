import { createSound } from "../libs/Core/Sound/Sound";
import { ISound } from "../libs/Core/Sound/ISound";
import { config } from "./Config";

export class Sounds {
    public static readonly test = loadSound('hurt.wav');
}

function loadSound(sound: string): ISound {
    return createSound(`${config.soundBasePath}/${sound}`);
}