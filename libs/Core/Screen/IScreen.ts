import { RenderRectangleOptions } from "./RenderRectangleOptions";
import { RenderTextOptions } from "./RenderTextOptions";
import { Sprite } from "./Sprite";

export interface IScreen {
    render(sprite: Sprite, x: number, y: number): void;
    getSize(): { width: number, height: number };
    setSize(width: number, height: number): void;
    renderText(text: string, x: number, y: number, options?: RenderTextOptions): void;
    renderRectangle(x: number, y: number, width: number, height: number, options?: RenderRectangleOptions): void;
    renderLine(x: number, y: number, width: number, height: number, brushSize: number, color: string): void;
}