export class Direction {
    
    public static get(x: number, y: number) {
        if (y < 0) return Directions.up;
        if (y > 0) return Directions.down;
        if (x < 0) return Directions.left;
        if (x > 0) return Directions.right;

        throw new Error(`Could not get direction for ${x}, ${y}`);
    }
}

export enum Directions {
    up,
    down,
    left,
    right
}