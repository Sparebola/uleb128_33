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

const read = (buffer: Uint8Array, value: bigInt.BigInteger, bitshift = 0) => {
  let i = 1;
  let bitShift = bitshift;
  let byte;

  do {
    byte = bigInt(buffer[i]);
    i += 1;

    bitShift += 7;
    // eslint-disable-next-line no-param-reassign
    value = value.or(byte.and(0x7f).shiftLeft(bitShift));
  } while (byte.greaterOrEquals(0x80));
  return { value: value.toJSNumber(), length: i };
};

export const readUleb128 = (buffer: Uint8Array) => {
  const value = bigInt(buffer[0]);

  if (value.greaterOrEquals(0x80)) {
    return read(buffer, value.and(0x7f));
  }

  return { value: value.toJSNumber(), length: 1 };
};

// eslint-disable-next-line camelcase
export const readUleb128_33 = (buffer: Uint8Array) => {
  const firstByte = bigInt(buffer[0]);
  const isMark = firstByte.and(0x1).toJSNumber();
  const value = firstByte.shiftRight(1);

  if (value.greaterOrEquals(0x40)) {
    const result = read(buffer, value.and(0x3f), -1) as {
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

// eslint-disable-next-line camelcase
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

// eslint-disable-next-line camelcase
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
