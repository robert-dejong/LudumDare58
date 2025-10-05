export class Maths {

    public static intersects(x1: number, y1: number, width1: number, height1: number, x2: number, y2: number, width2: number, height2: number): boolean {
        return (x1 + width1 >= x2 && x1 <= x2 + width2) &&
               (y1 + height1 >= y2 && y1 <= y2 + height2);
    }
    
    public static getDistance(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
}