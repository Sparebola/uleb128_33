"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const globals_1 = require("@jest/globals");
const __1 = require("..");
(0, globals_1.test)("readUleb128", () => {
    const uintArray = new Uint8Array([
        133, 133, 133, 5, 255, 243, 151, 229, 228, 131, 24, 11, 35, 11, 111, 66,
    ]);
    const dataOne = (0, __1.readUleb128)(uintArray);
    const dataTwo = (0, __1.readUleb128)(uintArray.subarray(dataOne.length));
    (0, globals_1.expect)(dataOne).toStrictEqual({ length: 4, value: 10568325 });
    (0, globals_1.expect)(dataTwo).toStrictEqual({ length: 7, value: 105683251231231 });
});
(0, globals_1.test)("readUleb128_33", () => {
    const uintArray = new Uint8Array([
        138, 152, 184, 128, 1, 193, 253, 243, 174, 137, 188, 188, 222, 3,
    ]);
    const dataOne = (0, __1.readUleb128_33)(uintArray);
    const dataTwo = (0, __1.readUleb128_33)(uintArray.subarray(dataOne.length));
    (0, globals_1.expect)(dataOne).toStrictEqual({
        isMark: 0,
        value: 134678021,
        length: 5,
    });
    (0, globals_1.expect)(dataTwo).toStrictEqual({
        isMark: 1,
        value: 134678012312321888,
        length: 9,
    });
});
(0, globals_1.test)("writeUleb128", () => {
    const dataOne = (0, __1.writeUleb128)(10568325);
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const dataTwo = (0, __1.writeUleb128)(105683251231231123123123);
    (0, globals_1.expect)(dataOne).toStrictEqual([133, 133, 133, 5]);
    (0, globals_1.expect)(dataTwo).toStrictEqual([
        128, 128, 128, 184, 146, 158, 145, 222, 153, 194, 89,
    ]);
});
(0, globals_1.test)("writeUleb128 string", () => {
    const dataOne = (0, __1.writeUleb128)(10568325);
    const dataTwo = (0, __1.writeUleb128)("105683251231231123123123");
    (0, globals_1.expect)(dataOne).toStrictEqual([133, 133, 133, 5]);
    (0, globals_1.expect)(dataTwo).toStrictEqual([
        179, 215, 255, 183, 146, 158, 145, 222, 153, 194, 89,
    ]);
});
(0, globals_1.test)("writeUleb128_33", () => {
    const dataOne = (0, __1.writeUleb128_33)(134678021);
    const dataTwo = (0, __1.writeUleb128_33)(134678012312321888);
    (0, globals_1.expect)(dataOne).toStrictEqual([138, 152, 184, 128, 1]);
    (0, globals_1.expect)(dataTwo).toStrictEqual([193, 253, 243, 174, 137, 188, 188, 222, 3]);
});
(0, globals_1.test)("writeUleb128_33 string", () => {
    const dataOne = (0, __1.writeUleb128_33)("134678021");
    const dataTwo = (0, __1.writeUleb128_33)("134678012312321888");
    (0, globals_1.expect)(dataOne).toStrictEqual([138, 152, 184, 128, 1]);
    (0, globals_1.expect)(dataTwo).toStrictEqual([193, 253, 243, 174, 137, 188, 188, 222, 3]);
});
(0, globals_1.test)("getUleb128Length", () => {
    const length = (0, __1.getUleb128Length)(10568325);
    const length2 = (0, __1.getUleb128Length)(105683251231231);
    (0, globals_1.expect)(length).toBe(4);
    (0, globals_1.expect)(length2).toBe(7);
});
(0, globals_1.test)("getUleb128Length string", () => {
    const length = (0, __1.getUleb128Length)("10568325");
    const length2 = (0, __1.getUleb128Length)("105683251231231");
    (0, globals_1.expect)(length).toBe(4);
    (0, globals_1.expect)(length2).toBe(7);
});
(0, globals_1.test)("getUleb128_33Length", () => {
    const length = (0, __1.getUleb128_33Length)(134678021);
    const length2 = (0, __1.getUleb128_33Length)(134678012312321888);
    (0, globals_1.expect)(length).toBe(5);
    (0, globals_1.expect)(length2).toBe(9);
});
(0, globals_1.test)("getUleb128_33Length string", () => {
    const length = (0, __1.getUleb128_33Length)("134678021");
    const length2 = (0, __1.getUleb128_33Length)("134678012312321888");
    (0, globals_1.expect)(length).toBe(5);
    (0, globals_1.expect)(length2).toBe(9);
});
//# sourceMappingURL=uleb128.test.js.map