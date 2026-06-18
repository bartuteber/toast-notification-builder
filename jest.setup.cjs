// jsdom doesn't implement Web Crypto, but the stores use `crypto.randomUUID()`
// for ids. Back it with Node's crypto so ids work in tests.
const nodeCrypto = require('node:crypto')

if (typeof globalThis.crypto === 'undefined') {
  Object.defineProperty(globalThis, 'crypto', {
    value: nodeCrypto.webcrypto,
    configurable: true,
  })
}

if (typeof globalThis.crypto.randomUUID !== 'function') {
  globalThis.crypto.randomUUID = () => nodeCrypto.randomUUID()
}
