/* eslint-disable camelcase */
import bigInt from "big-integer";

const write = (arr: number[], integer: bigInt.BigInteger) => {
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

const read = (
  buffer: ArrayLike<number>,
  value: bigInt.BigInteger,
  index: number,
  bitshift = 0
) => {
  let i = index;
  let bitShift = bitshift;
  let byte;

  do {
    byte = bigInt(buffer[i]);
    i += 1;

    bitShift += 7;
    // eslint-disable-next-line no-param-reassign
    value = value.or(byte.and(0x7f).shiftLeft(bitShift));
  } while (byte.greaterOrEquals(0x80));
  return { value: value.toJSNumber(), length: i - index + 1 };
};

export const readUleb128 = (buffer: ArrayLike<number>, index = 0) => {
  if (buffer.length === 0) return { value: 0, length: 0 };
  const value = bigInt(buffer[index]);

  if (value.greaterOrEquals(0x80)) {
    return read(buffer, value.and(0x7f), index + 1);
  }

  return { value: value.toJSNumber(), length: 1 };
};

export const readUleb128_33 = (buffer: ArrayLike<number>, index = 0) => {
  if (buffer.length === 0) return { value: 0, length: 0, isMark: 0 };
  const firstByte = bigInt(buffer[index]);
  const isMark = firstByte.and(0x1).toJSNumber();
  const value = firstByte.shiftRight(1);

  if (value.greaterOrEquals(0x40)) {
    const result = read(buffer, value.and(0x3f), index + 1, -1) as {
      value: number;
      length: number;
      isMark: number;
    }; // extend type
    result.isMark = isMark;
    return result;
  }

  return {
    isMark,
    value: value.toJSNumber(),
    length: 1,
  };
};

export const writeUleb128 = (integer: number | string) => {
  const result: number[] = [];
  return write(result, bigInt(integer as number));
};

export const writeUleb128_33 = (integer: number | string, isMark?: boolean) => {
  let integerB = bigInt(integer as number);
  if (isMark === undefined) {
    // eslint-disable-next-line no-bitwise, no-param-reassign
    isMark = (integerB.toJSNumber() | 0) !== integerB.toJSNumber();
  }

  const result: number[] = [];
  let byte = integerB.and(0x3f).shiftLeft(1).or(Number(isMark));
  integerB = integerB.shiftRight(6);
  if (!integerB.isZero()) {
    byte = byte.or(0x80);
  }
  result.push(byte.toJSNumber());

  return write(result, integerB);
};

export const getUleb128Length = (integer: number | string) => {
  let result = 1;
  let integerB = bigInt(integer as number);
  integerB = integerB.shiftRight(7);

  while (!integerB.isZero()) {
    integerB = integerB.shiftRight(7);
    result += 1;
  }
  return result;
};

export const getUleb128_33Length = (integer: number | string) => {
  let result = 1;
  let integerB = bigInt(integer as number);
  integerB = integerB.shiftRight(6);

  while (!integerB.isZero()) {
    integerB = integerB.shiftRight(7);
    result += 1;
  }
  return result;
};

export default {
  getUleb128Length,
  getUleb128_33Length,
  readUleb128,
  readUleb128_33,
  writeUleb128,
  writeUleb128_33,
};
