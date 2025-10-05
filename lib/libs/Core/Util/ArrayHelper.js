var ArrayHelper = /** @class */ (function () {
    function ArrayHelper() {
    }
    ArrayHelper.Create2DArray = function (size1, size2, defaultValue) {
        var array = new Array(size1);
        for (var i = 0; i <= size2; i++) {
            array[i] = new Array(size2);
        }
        for (var i = 0; i <= size1; i++) {
            for (var j = 0; j <= size2; j++) {
                array[i][j] = defaultValue();
            }
        }
        return array;
    };
    return ArrayHelper;
}());
export { ArrayHelper };
//# sourceMappingURL=ArrayHelper.js.map