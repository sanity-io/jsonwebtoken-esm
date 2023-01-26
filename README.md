# jsonwebtoken-esm

A wrapper that rebundles [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) into ESM, so you can use it in your `vite`, `esm.sh`, or wherever you need ESM.

## Install

```bash
$ npm install jsonwebtoken-esm
```

## Usage

Same as [before](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#usage), but now with ESM imports.
To see which version of `jsonwebtoken` is used in the bundle:

```js
import { version } from 'jsonwebtoken-esm'

console.log(version) // "8.5.1"
```
