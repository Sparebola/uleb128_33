"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUleb128_33Length = exports.getUleb128Length = exports.writeUleb128_33 = exports.writeUleb128 = exports.readUleb128_33 = exports.readUleb128 = void 0;
/* eslint-disable camelcase */
const big_integer_1 = __importDefault(require("big-integer"));
const write = (arr, integer) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let byte = integer.and(0x7f);
        // eslint-disable-next-line no-param-reassign
        integer = integer.shiftRight(7);
        if (integer.isZero()) {
            arr.push(byte.toJSNumber());
            break;
        }
        byte = byte.or(0x80);
        arr.push(byte.toJSNumber());
    }
    return arr;
};
const read = (buffer, value, index, bitshift = 0) => {
    let i = index;
    let bitShift = bitshift;
    let byte;
    do {
        byte = (0, big_integer_1.default)(buffer[i]);
        i += 1;
        bitShift += 7;
        // eslint-disable-next-line no-param-reassign
        value = value.or(byte.and(0x7f).shiftLeft(bitShift));
    } while (byte.greaterOrEquals(0x80));
    return { value: value.toJSNumber(), length: i - index + 1 };
};
const readUleb128 = (buffer, index = 0) => {
    if (buffer.length === 0)
        return { value: 0, length: 0 };
    const value = (0, big_integer_1.default)(buffer[index]);
    if (value.greaterOrEquals(0x80)) {
        return read(buffer, value.and(0x7f), index + 1);
    }
    return { value: value.toJSNumber(), length: 1 };
};
exports.readUleb128 = readUleb128;
const readUleb128_33 = (buffer, index = 0) => {
    if (buffer.length === 0)
        return { value: 0, length: 0, isMark: 0 };
    const firstByte = (0, big_integer_1.default)(buffer[index]);
    const isMark = firstByte.and(0x1).toJSNumber();
    const value = firstByte.shiftRight(1);
    if (value.greaterOrEquals(0x40)) {
        const result = read(buffer, value.and(0x3f), index + 1, -1); // extend type
        result.isMark = isMark;
        return result;
    }
    return {
        isMark,
        value: value.toJSNumber(),
        length: 1,
    };
};
exports.readUleb128_33 = readUleb128_33;
const writeUleb128 = (integer) => {
    const result = [];
    return write(result, (0, big_integer_1.default)(integer));
};
exports.writeUleb128 = writeUleb128;
const writeUleb128_33 = (integer, isMark) => {
    let integerB = (0, big_integer_1.default)(integer);
    if (isMark === undefined) {
        // eslint-disable-next-line no-bitwise, no-param-reassign
        isMark = (integerB.toJSNumber() | 0) !== integerB.toJSNumber();
    }
    const result = [];
    let byte = integerB.and(0x3f).shiftLeft(1).or(Number(isMark));
    integerB = integerB.shiftRight(6);
    if (!integerB.isZero()) {
        byte = byte.or(0x80);
    }
    result.push(byte.toJSNumber());
    return write(result, integerB);
};
exports.writeUleb128_33 = writeUleb128_33;
const getUleb128Length = (integer) => {
    let result = 1;
    let integerB = (0, big_integer_1.default)(integer);
    integerB = integerB.shiftRight(7);
    while (!integerB.isZero()) {
        integerB = integerB.shiftRight(7);
        result += 1;
    }
    return result;
};
exports.getUleb128Length = getUleb128Length;
const getUleb128_33Length = (integer) => {
    let result = 1;
    let integerB = (0, big_integer_1.default)(integer);
    integerB = integerB.shiftRight(6);
    while (!integerB.isZero()) {
        integerB = integerB.shiftRight(7);
        result += 1;
    }
    return result;
};
exports.getUleb128_33Length = getUleb128_33Length;
exports.default = {
    getUleb128Length: exports.getUleb128Length,
    getUleb128_33Length: exports.getUleb128_33Length,
    readUleb128: exports.readUleb128,
    readUleb128_33: exports.readUleb128_33,
    writeUleb128: exports.writeUleb128,
    writeUleb128_33: exports.writeUleb128_33,
};
//# sourceMappingURL=index.js.map