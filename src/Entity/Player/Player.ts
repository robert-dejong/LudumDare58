import { keyBinds } from "../../Keybinds";
import { Animations } from "../Animations";
import { MobEntity } from "../MobEntity";

export class Player extends MobEntity {
    constructor() {
        super(30, 20);
        this.animations = Animations.player;
        this.speed = 1.1;
    }

    public override tick(): void {
        super.tick();

        let moveX = 0;
        let moveY = 0;
        if (keyBinds.up.isPressed) moveY -= this.speed;
        if (keyBinds.down.isPressed) moveY += this.speed;
        if (keyBinds.left.isPressed) moveX -= this.speed;
        if (keyBinds.right.isPressed) moveX += this.speed;

        if (moveX !== 0 || moveY !== 0) {
            this.move(moveX, moveY);
        }
    }
}