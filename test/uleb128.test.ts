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

test("readUleb128 empty", () => {
  const dataOne = readUleb128([]);
  expect(dataOne).toStrictEqual({ length: 0, value: 0 });
});

test("readUleb128_33 empty", () => {
  const dataOne = readUleb128_33([]);
  expect(dataOne).toStrictEqual({ length: 0, value: 0, isMark: 0 });
});

test("readUleb128 index", () => {
  const dataOne = readUleb128([27, 76, 74, 2, 6, 156, 1, 0, 0, 11, 9, 3], 5);
  expect(dataOne).toStrictEqual({ length: 2, value: 156 });
});

test("readUleb128_33 index", () => {
  const dataOne = readUleb128_33([11, 112, 184, 124, 0, 59], 4);
  expect(dataOne).toStrictEqual({ length: 1, value: 0, isMark: 0 });
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
  const dataTwo = writeUleb128(10568325123123112);

  expect(dataOne).toStrictEqual([133, 133, 133, 5]);
  expect(dataTwo).toStrictEqual([168, 207, 214, 134, 223, 250, 226, 18]);
});

test("writeUleb128 string", () => {
  const dataOne = writeUleb128(10568325);
  const dataTwo = writeUleb128("105683251231231123123123");

  expect(dataOne).toStrictEqual([133, 133, 133, 5]);
  expect(dataTwo).toStrictEqual([
    179, 215, 255, 183, 146, 158, 145, 222, 153, 194, 89,
  ]);
});

test("writeUleb128_33 mark", () => {
  const dataOne = writeUleb128_33(134678021, true);
  const dataTwo = writeUleb128_33(134678012312321888, true);

  expect(dataOne).toStrictEqual([139, 152, 184, 128, 1]);
  expect(dataTwo).toStrictEqual([193, 253, 243, 174, 137, 188, 188, 222, 3]);
});

test("writeUleb128_33 not mark", () => {
  const dataOne = writeUleb128_33(134678021, false);
  const dataTwo = writeUleb128_33(134678012312321888, false);

  expect(dataOne).toStrictEqual([138, 152, 184, 128, 1]);
  expect(dataTwo).toStrictEqual([192, 253, 243, 174, 137, 188, 188, 222, 3]);
});

test("getUleb128Length", () => {
  const length = getUleb128Length(10568325);
  const length2 = getUleb128Length(105683251231231);
  const length3 = getUleb128Length(1);

  expect(length).toBe(4);
  expect(length2).toBe(7);
  expect(length3).toBe(1);
});

test("getUleb128_33Length", () => {
  const length = getUleb128_33Length(134678021);
  const length2 = getUleb128_33Length(134678012312321888);
  const length3 = getUleb128_33Length(1);

  expect(length).toBe(5);
  expect(length2).toBe(9);
  expect(length3).toBe(1);
});

test("uleb128 length equal", () => {
  const dataOne = writeUleb128(1);
  const length = getUleb128Length(1);

  expect(dataOne).toStrictEqual([1]);
  expect(dataOne.length).toBe(1);
  expect(length).toBe(1);
});

// этот
test("uleb128_33 length equal mark", () => {
  const dataOne = writeUleb128_33(1, true);
  const length = getUleb128_33Length(1);

  expect(dataOne).toStrictEqual([3]);
  expect(dataOne.length).toBe(1);
  expect(length).toBe(1);
});

// этот
test("uleb128_33 length equal not mark", () => {
  const dataOne = writeUleb128_33(1, false);
  const length = getUleb128_33Length(1);

  expect(dataOne).toStrictEqual([2]);
  expect(dataOne.length).toBe(1);
  expect(length).toBe(1);
});

test("uleb128 length long equal", () => {
  const dataOne = writeUleb128("13467801231232181111111188");
  const length = getUleb128Length("13467801231232181111111188");

  expect(dataOne).toStrictEqual([
    148, 252, 160, 212, 233, 146, 228, 220, 247, 213, 143, 89,
  ]);
  expect(dataOne.length).toBe(12);
  expect(length).toBe(12);
});

test("uleb128_33 length long equal mark", () => {
  const dataOne = writeUleb128_33("13467801231232181111111188", true);
  const length = getUleb128_33Length("13467801231232181111111188");

  expect(dataOne).toStrictEqual([
    169, 248, 193, 168, 211, 165, 200, 185, 239, 171, 159, 178, 1,
  ]);
  expect(dataOne.length).toBe(13);
  expect(length).toBe(13);
});

test("uleb128_33 length long equal not mark", () => {
  const dataOne = writeUleb128_33("13467801231232181111111188", false);
  const length = getUleb128_33Length("13467801231232181111111188");

  expect(dataOne).toStrictEqual([
    168, 248, 193, 168, 211, 165, 200, 185, 239, 171, 159, 178, 1,
  ]);
  expect(dataOne.length).toBe(13);
  expect(length).toBe(13);
});
