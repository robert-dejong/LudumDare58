export class MouseHandler {
    private constructor() { }

    private static isPressed: boolean;

    public static bind(type: 'mousedrag' | 'mousemove' | 'click', action: (x: number, y: number) => void) {
        if (type === 'mousedrag') {
            this.bindMouseDrag(action);
            return;
        }
        
        const event = (e: MouseEvent) => {
            if (type === 'mousemove' && this.isPressed) return;
            action(e.offsetX, e.offsetY);
        };

        document.getElementById('canvas').addEventListener(type, event);
    }

    private static bindMouseDrag(action: (x: number, y: number) => void) {
        document.getElementById('canvas').addEventListener('mousedown', () => {
            this.isPressed = true;
        });

        document.getElementById('canvas').addEventListener('mouseup', () => {
            this.isPressed = false;
        });

        document.getElementById('canvas').addEventListener('mousemove', (e: MouseEvent) => {
            if (this.isPressed) {
                action(e.offsetX, e.offsetY);
            }
        });
    }
}