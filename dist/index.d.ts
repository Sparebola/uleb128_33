export declare const readUleb128: (buffer: ArrayLike<number>, index?: number) => {
    value: number;
    length: number;
};
export declare const readUleb128_33: (buffer: ArrayLike<number>, index?: number) => {
    value: number;
    length: number;
    isMark: number;
};
export declare const writeUleb128: (integer: number | string) => number[];
export declare const writeUleb128_33: (integer: number | string, isMark?: boolean) => number[];
export declare const getUleb128Length: (integer: number | string) => number;
export declare const getUleb128_33Length: (integer: number | string) => number;
declare const _default: {
    getUleb128Length: (integer: number | string) => number;
    getUleb128_33Length: (integer: number | string) => number;
    readUleb128: (buffer: ArrayLike<number>, index?: number) => {
        value: number;
        length: number;
    };
    readUleb128_33: (buffer: ArrayLike<number>, index?: number) => {
        value: number;
        length: number;
        isMark: number;
    };
    writeUleb128: (integer: number | string) => number[];
    writeUleb128_33: (integer: number | string, isMark?: boolean) => number[];
};
export default _default;
