import { IScreen } from "../Screen/IScreen";
import { Maths } from "../Util/Maths";
import { IUIManager } from "./IUIManager";
import { UI } from "./UI";

class UIManager implements IUIManager {
    private readonly interfaces: Map<string, UI>;

    // !Maths.intersects(this.dragStartX, this.dragStartY, 0, 0, e.offsetX - (dragThreshold / 2), e.offsetY - (dragThreshold / 2), dragThreshold, dragThreshold)
    constructor() {
        this.interfaces = new Map<string, UI>();
    }

    public tick(): void {
        this.interfaces.forEach(ui => {
            if (!ui.isShow()) return;

            ui.tick();
        })
    }

    public render(screen: IScreen): void {
        this.interfaces.forEach(ui => {
            if (!ui.isShow()) return;

            ui.render(screen);
        })
    }

    public handleClick(x: number, y: number): void {
        this.interfaces.forEach(ui => {
            if (!ui.isShow()) return;
            
            const position = ui.getPosition();

            ui.reset();
            
            if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.click(x - position.x, y - position.y);
            }
        })
    }

    public handleHover(x: number, y: number): void {
        this.interfaces.forEach(ui => {
            if (!ui.isShow()) return;
            
            const position = ui.getPosition();

            ui.setMousePosition(x, y);
            ui.resetHover();

            if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.reset();
                ui.hover(x - position.x, y - position.y);
            }
        })
    }

    public handleDrag(x: number, y: number): void {
        this.interfaces.forEach(ui => {
            if (!ui.isShow()) return;
            
            const position = ui.getPosition();

            ui.setMousePosition(x, y);
            
            if (Maths.intersects(x, y, 0, 0, position.x, position.y, position.width, position.height)) {
                ui.resetHover();
                ui.drag(x - position.x, y - position.y); 
            }
        })
    }

    public toggle = (name: string): void => this.interfaces.get(name).toggle();
    public add = (name: string, ui: UI): void => {( this.interfaces.set(name, ui) )};
}

export const createUIManager = () => new UIManager();