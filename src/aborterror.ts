import { isObject } from './util/isiterable.js';

/** @ignore */
export class AbortError extends Error {
  constructor(message = 'The operation has been aborted') {
    super(message);
    Object.setPrototypeOf(this, AbortError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'AbortError';
  }

  get [Symbol.toStringTag]() {
    return 'AbortError';
  }
}

export function throwIfAborted(signal?: AbortSignal) {
  if (signal && signal.aborted) {
    throw new AbortError();
  }
}

Object.defineProperty(AbortError, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(x: any) {
    return (
      isObject(x) && (x.constructor.name === 'AbortError' || x[Symbol.toStringTag] === 'AbortError')
    );
  },
});
