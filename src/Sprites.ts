import { Sprite } from "../libs/Core/Screen/Sprite";
import { config } from "./Config";

export class Sprites {
    public static readonly ram = loadImage('ram.png');
    public static readonly ramIcon = loadImage('ram_icon.png');
    
    public static readonly overclockIcon = loadImage('overclock_icon.png');

    public static readonly npuIcon = loadImage('npu_icon.png');
    public static readonly npuProjectile = loadImage('npu_projectile2.png');

    public static readonly cpuIcon = loadImage('cpu_icon.png');
    public static readonly cpuProjectile = loadImage('cpu_projectile.png');

    public static readonly broom = loadImage('broom.png');
    public static readonly broom2 = loadImage('broom2.png');

    public static readonly background = loadImage('motherboard.png');
    
    public static readonly itemPlusIcon = loadImage('plus.png');
    public static readonly restartIcon = loadImage('restart.png');
}

function loadImage(image: string): Sprite {
    return new Sprite(`${config.imageBasePath}/${image}`);
}