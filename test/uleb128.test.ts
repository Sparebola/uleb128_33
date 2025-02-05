/* eslint-disable camelcase */
import { expect, test } from "@jest/globals";

import {
  getUleb128Length,
  getUleb128_33Length,
  readUleb128,
  readUleb128_33,
  writeUleb128,
  writeUleb128_33,
} from "../src";

test("readUleb128", () => {
  const uintArray = new Uint8Array([
    133, 133, 133, 5, 255, 243, 151, 229, 228, 131, 24, 11, 35, 11, 111, 66,
  ]);
  const dataOne = readUleb128(uintArray);
  const dataTwo = readUleb128(uintArray.subarray(dataOne.length));

  expect(dataOne).toStrictEqual({ length: 4, value: 10568325 });
  expect(dataTwo).toStrictEqual({ length: 7, value: 105683251231231 });
});

test("readUleb128_33", () => {
  const uintArray = [
    138, 152, 184, 128, 1, 193, 253, 243, 174, 137, 188, 188, 222, 3,
  ];
  const dataOne = readUleb128_33(uintArray);
  const dataTwo = readUleb128_33(uintArray.slice(dataOne.length));

  expect(dataOne).toStrictEqual({
    isMark: 0,
    value: 134678021,
    length: 5,
  });
  expect(dataTwo).toStrictEqual({
    isMark: 1,
    value: 134678012312321888,
    length: 9,
  });
});

test("writeUleb128", () => {
  const dataOne = writeUleb128(10568325);
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const dataTwo = writeUleb128(105683251231231123123123);

  expect(dataOne).toStrictEqual([133, 133, 133, 5]);
  expect(dataTwo).toStrictEqual([
    128, 128, 128, 184, 146, 158, 145, 222, 153, 194, 89,
  ]);
});

test("writeUleb128 string", () => {
  const dataOne = writeUleb128(10568325);
  const dataTwo = writeUleb128("105683251231231123123123");

  expect(dataOne).toStrictEqual([133, 133, 133, 5]);
  expect(dataTwo).toStrictEqual([
    179, 215, 255, 183, 146, 158, 145, 222, 153, 194, 89,
  ]);
});

test("writeUleb128_33", () => {
  const dataOne = writeUleb128_33(134678021);
  const dataTwo = writeUleb128_33(134678012312321888);

  expect(dataOne).toStrictEqual([138, 152, 184, 128, 1]);
  expect(dataTwo).toStrictEqual([193, 253, 243, 174, 137, 188, 188, 222, 3]);
});

test("writeUleb128_33 string", () => {
  const dataOne = writeUleb128_33("134678021");
  const dataTwo = writeUleb128_33("134678012312321888");

  expect(dataOne).toStrictEqual([138, 152, 184, 128, 1]);
  expect(dataTwo).toStrictEqual([193, 253, 243, 174, 137, 188, 188, 222, 3]);
});

test("getUleb128Length", () => {
  const length = getUleb128Length(10568325);
  const length2 = getUleb128Length(105683251231231);

  expect(length).toBe(4);
  expect(length2).toBe(7);
});

test("getUleb128Length string", () => {
  const length = getUleb128Length("10568325");
  const length2 = getUleb128Length("105683251231231");

  expect(length).toBe(4);
  expect(length2).toBe(7);
});

test("getUleb128_33Length", () => {
  const length = getUleb128_33Length(134678021);
  const length2 = getUleb128_33Length(134678012312321888);

  expect(length).toBe(5);
  expect(length2).toBe(9);
});

test("getUleb128_33Length string", () => {
  const length = getUleb128_33Length("134678021");
  const length2 = getUleb128_33Length("134678012312321888");

  expect(length).toBe(5);
  expect(length2).toBe(9);
});
