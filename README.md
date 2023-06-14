# ULEB128_33

Encoding and decoding large numbers (uleb128 and uleb128_33)

# Installation

```bash
npm install uleb128_33
```

# Documentation

#### `readUleb128`: Gets the Uint8Array parameter, returns the object

```javascript
const readUleb128: (buffer: Uint8Array) => {
    value: string;
    length: number;
};
```

#### `readUleb128_33`: Gets the Uint8Array parameter, returns the object

```javascript
const readUleb128_33: (buffer: Uint8Array) => {
    value: string;
    length: number;
    isMark: number;
};
```

#### `writeUleb128`: Gets an integer parameter, can be a string or a number. Returns array of bytes

```javascript
 const writeUleb128: (integer: number | string) => number[];
```

#### `writeUleb128_33`: Gets an integer parameter, can be a string or a number, and an optional isMark, boolean (see below). If not specified, it is determined automatically. Returns an array of bytes

```javascript
const writeUleb128_33: (integer: number | string, isMark?: boolean) => number[];
```

#### `getUleb128Length`: Gets an integer parameter, can be a string or a number. Returns number length

```javascript
const getUleb128Length: (integer: number | string) => number;
```

#### `getUleb128_33Length`: Gets an integer parameter, can be a string or a number. Returns number length

```javascript
const getUleb128_33Length: (integer: number | string) => number;
```

##### `isMark`

If the "isMark" is 0, then the value read is a number (32-bit number)
Otherwise, the value is a 64-bit number, and you need to read another ULEB128

# Usage

#### ESNext

```javascript
import {
  getUleb128Length,
  getUleb128_33Length,
  readUleb128,
  readUleb128_33,
  writeUleb128,
  writeUleb128_33,
} from "uleb128_33";
```

#### CommonJS

```javascript
const {
  getUleb128Length,
  getUleb128_33Length,
  readUleb128,
  readUleb128_33,
  writeUleb128,
  writeUleb128_33,
} = require("uleb128_33");
```

#### readUleb128

```javascript
const uintArray = new Uint8Array([
  133, 133, 133, 5, 255, 243, 151, 229, 228, 131, 24, 11, 35, 11, 111, 66,
]);
const dataOne = readUleb128(uintArray);
const dataTwo = readUleb128(uintArray.subarray(dataOne.length));
console.log(dataOne); // { length: 4, value: "10568325" }
console.log(dataTwo); // { length: 7, value: "105683251231231" }
```

#### readUleb128_33

```javascript
const uintArray = new Uint8Array([
  138, 152, 184, 128, 1, 193, 253, 243, 174, 137, 188, 188, 222, 3,
]);
const dataOne = readUleb128_33(uintArray);
const dataTwo = readUleb128_33(uintArray.subarray(dataOne.length));
console.log(dataOne); // { isMark: 0, value: "134678021", length: 5 }
console.log(dataTwo); // { isMark: 1, value: "134678012312321888", length: 9 }
```

#### writeUleb128_33

```javascript
const dataOne = writeUleb128_33(134678021);
const dataTwo = writeUleb128_33("134678012312321888");
console.log(dataOne); // [138, 152, 184, 128, 1]
console.log(dataTwo); // [193, 253, 243, 174, 137, 188, 188, 222, 3]
```

# Test

You can run the tests through `npm run test`.
You will need to install `rimraf`, `typescript`, and `jest` in the global area

# LICENSE

The MIT License (MIT)
