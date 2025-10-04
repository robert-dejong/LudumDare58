/* eslint-disable @typescript-eslint/no-unused-vars */
import { IScreen } from "../Screen/IScreen";

export abstract class UI {
    protected mouseX: number;
    protected mouseY: number;

    private show: boolean;

    public abstract render(screen: IScreen): void;
    public abstract tick(): void;
    public abstract getPosition(): { x: number, y: number, width: number, height: number };
    
    public click(x: number, y: number): void { }
    public hover(x: number, y: number): void { }
    public drag(x: number, y: number): void { }
    public resetHover(): void { }
    public resetDrag(): void { }
    
    public reset(): void {
        this.resetHover();
        this.resetDrag();
    }

    public isShow = (): boolean => this.show;
    public setMousePosition = (x: number, y: number): void => {(this.mouseX = x, this.mouseY = y )};

    public toggle = (): void => {
        this.show = !this.show;

        if (!this.show) {
            this.reset();
        }
    };
}