import { IScreen } from "./IScreen";
import { RenderRectangleOptions } from "./RenderRectangleOptions";
import { RenderTextOptions } from "./RenderTextOptions";
import { Sprite } from "./Sprite";

class Screen implements IScreen {
    private width: number;
    private height: number;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private scale: number;

    constructor(scale: number) {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scale = scale;
    }

    public getSize = () => ({ width: this.width, height: this.height });

    public render(sprite: Sprite, x: number, y: number): void {
        if (!sprite.loaded) return;
        if (!this.shouldRender(x, y, sprite.width, sprite.height)) return; // Still neccessary for entities

        this.context.drawImage(sprite.image, x, y, sprite.width, sprite.height);
    }

    public setSize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;

        this.context.imageSmoothingEnabled = false;
        this.context.scale(this.scale, this.scale);

        this.width = this.canvas.width / this.scale;
        this.height = this.canvas.height / this.scale;
    }

    public renderText(text: string, x: number, y: number, options: RenderTextOptions = new RenderTextOptions()): void {
        options = {...new RenderTextOptions(), ...options};
        this.context.fillStyle = options.fontColor;
        this.context.font = `${options.fontWeight} ${options.fontSize}px Arial`;
        
        if (options.width && options.textAlign === 'center') {
            const textWidth = this.context.measureText(text).width;
            this.context.fillText(text, x + (options.width - textWidth) / 2, y);
            return;
        }
        
        if (options.width && options.textAlign === 'right') {
            this.context.textAlign = 'right';
            this.context.fillText(text, x + options.width, y);
            this.context.textAlign = 'left';
            return;
        }

        if (!options.maxWidth) {
            this.context.fillText(text, x, y);
            return;
        }
        
        const words = text.split(' ');
        let currentLine = '';
        let lineHeight = 0;

        words.forEach(word => {
            const line = `${currentLine}${currentLine.length !== 0 ? ' ' : ''}${word}`;

            if (this.context.measureText(line).width > options.maxWidth) {
                this.context.fillText(currentLine, x, y + lineHeight);
                currentLine = word;
                lineHeight += (options.fontSize * 1.2);
                return;
            }

            currentLine = line;
        });

        if (currentLine.length > 0) {
            this.context.fillText(currentLine, x, y + lineHeight);
        }
    }

    public renderRectangle(x: number, y: number, width: number, height: number, options: RenderRectangleOptions = new RenderRectangleOptions()) {
        options = {...new RenderRectangleOptions(), ...options};
        this.context.fillStyle = options.color;
        this.context.strokeStyle = options.color;
        this.context.globalAlpha = options.alpha;
        
        if (options.filled) {
            this.context.fillRect(x, y, width, height);
        } else {
            this.context.beginPath();
            this.context.rect(x, y, width, height);
            this.context.stroke();
        }

        this.context.globalAlpha = 1.0;
    }

    public renderLine(x: number, y: number, width: number, height: number, brushSize: number, color: string) {
        this.context.strokeStyle = color;
        this.context.lineWidth = brushSize;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(width, height);
        this.context.stroke();
    }

    public setCursorVisibility(visible: boolean) {
        this.canvas.style.cursor = visible ? 'auto' : 'none';
    }

    private shouldRender(absoluteX: number, absoluteY: number, renderWidth: number, renderHeight: number): boolean {
        if(absoluteX > this.width) return false;
        if(absoluteY > this.height) return false;
        if(absoluteX + renderWidth < 0) return false;
        if(absoluteY + renderHeight < 0) return false;
        
        return true;
    }
}

export const createScreen2D = (scale: number) => new Screen(scale);