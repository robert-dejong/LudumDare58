import { AnimationBuilder } from "../../libs/Animation/AnimationBuilder";
import { Directions } from "../../libs/Core/Util/Direction";
import { Sprites } from "../Sprites";

export class Animations {
    public static readonly player = new AnimationBuilder()
        .add(Directions.down, Sprites.playerDown)
        .add(Directions.up, Sprites.playerUp)
        .add(Directions.left, Sprites.playerLeft)
        .add(Directions.right, Sprites.playerRight)
        .setCycleSpeed(10)
        .build();
}