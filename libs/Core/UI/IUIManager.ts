import { IScreen } from "../Screen/IScreen";
import { UI } from "./UI";

export interface IUIManager {
    tick(): void;
    render(screen: IScreen): void;
    toggle(name: string): void;
    add(name: string, ui: UI): void;
    handleHover(x: number, y: number): void;
    handleClick(x: number, y: number): void;
    handleDrag(x: number, y: number): void;
}