export class Key {
    public readonly keys: string[];
    private pressed = false;

    constructor(keys: string | string[]) {
        this.keys = Array.isArray(keys) ? keys : [keys];
    }

    public get isPressed() {
        return this.pressed;
    }
    
    public toggle(pressed: boolean): void {
        this.pressed = pressed;
    }

    public release(): void {
        this.pressed = false;
    }
}