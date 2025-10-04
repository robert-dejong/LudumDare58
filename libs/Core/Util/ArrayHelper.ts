export class ArrayHelper {
    public static Create2DArray<T>(size1: number, size2: number, defaultValue: () => T): T[][] {
        const array: T[][] = new Array(size1);

        for(let i = 0; i <= size2; i++) {
            array[i] = new Array(size2);
        }

        for(let i = 0; i <= size1; i++) {
            for(let j = 0; j <= size2; j++) {
                array[i][j] = defaultValue();
            }
        }

        return array;
    }
}