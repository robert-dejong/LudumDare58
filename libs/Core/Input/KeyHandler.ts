import { Key } from "./Key";

export class KeyHandler {
    private static binds = new Map<string, Key>();

    private constructor() { }

    public static init(binds: { [key: string]: Key }): void {
        for (const [, value] of Object.entries(binds)) {
            value.keys.forEach(key => KeyHandler.binds.set(key, value));
        }

        KeyHandler.keyEvent('keydown');
        KeyHandler.keyEvent('keyup');
    }

    private static keyEvent(type: 'keydown' | 'keyup'): void {
        const pressed = type === 'keydown';

        window.addEventListener(type, (e: KeyboardEvent) => {
            // e.preventDefault();
            // console.log("Pressing key: " + e.key);

            if (!KeyHandler.binds.has(e.key)) return;

            const bind = KeyHandler.binds.get(e.key);

            bind.toggle(pressed);
        });
    }
}