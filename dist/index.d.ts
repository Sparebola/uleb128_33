export declare const readUleb128: (buffer: Uint8Array) => {
    value: number;
    length: number;
};
export declare const readUleb128_33: (buffer: Uint8Array) => {
    value: number;
    length: number;
    isMark: number;
};
export declare const writeUleb128: (integer: number | string) => number[];
export declare const writeUleb128_33: (integer: number | string, isMark?: boolean) => number[];
export declare const getUleb128Length: (integer: number | string) => number;
export declare const getUleb128_33Length: (integer: number | string) => number;
