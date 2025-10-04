import { Sprite } from "../libs/Core/Screen/Sprite";
import { config } from "./Config";

export class Sprites {
    public static readonly playerDown = [loadImage('player_down1.png'), loadImage('player_down2.png')];
    public static readonly playerUp = [loadImage('player_up1.png'), loadImage('player_up2.png')];
    public static readonly playerLeft = [loadImage('player_left1.png'), loadImage('player_left2.png')];
    public static readonly playerRight = [loadImage('player_right1.png'), loadImage('player_right2.png')];
    public static readonly tree = loadImage('tree.png');
    public static readonly wood = loadImage('wood.png');

    public static readonly ram = loadImage('ram.png');
    public static readonly cpuIcon = loadImage('cpu.png');
    public static readonly threadsIcon = loadImage('threads.png');
    public static readonly ramIcon = loadImage('ram_icon.png');
}

function loadImage(image: string): Sprite {
    return new Sprite(`${config.imageBasePath}/${image}`);
}