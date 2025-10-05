import { IActionExecutor } from "../../../libs/Core/Action/IActionExecutor";
import { Mouse } from "../../../libs/Core/Input/Mouse";
import { IScreen } from "../../../libs/Core/Screen/IScreen"
import { UseBroomAction } from "../../Actions/Player/UseBroomAction";
import { config } from "../../Config";
import { Sprites } from "../../Sprites";

export class PlayerActions {
    //private broomCooldown = 120;
    //private broomCooldownTimeLeft = 0;

    private broomAnimationAnimationTime = 26;
    private broomAnimationAnimationTimeLeft = 0;

    constructor(private readonly actionExecutor: IActionExecutor) { }

    public tick() {
        //if (this.broomCooldownTimeLeft > 0) {
        //    this.broomCooldownTimeLeft--;
        //}

        if (this.broomAnimationAnimationTimeLeft > 0) {
            this.broomAnimationAnimationTimeLeft--;
        }
    }

    public useBroom(x: number, y: number) {
        //if (this.broomCooldownTimeLeft > 0) return;

        if (this.broomAnimationAnimationTimeLeft <= 0) {
            this.broomAnimationAnimationTimeLeft = this.broomAnimationAnimationTime;
        }
        //this.broomCooldownTimeLeft = this.broomCooldown;

        this.actionExecutor.execute(new UseBroomAction(x, y));
    }

    public render(screen: IScreen) {
        const mouseX = Mouse.x / config.renderScale;
        const mouseY = Mouse.y / config.renderScale;
        
        if (mouseX > config.leftUiBarWidth && mouseY < config.BottomUiBarHeight) {
            screen.setCursorVisibility(false);
            const sprite = this.broomAnimationAnimationTimeLeft >= (this.broomAnimationAnimationTime / 2) ? Sprites.broom2 : Sprites.broom;
            screen.render(sprite, mouseX, mouseY);
        } else {
            screen.setCursorVisibility(true);
        }
    }
}