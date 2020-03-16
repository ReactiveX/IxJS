export class AbortError extends Error {
  constructor(message: string = 'The operation has been aborted') {
    super(message);
    Object.setPrototypeOf(this, AbortError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'AbortError';
  }

  get [Symbol.toStringTag]() { return 'AbortError'; }
}

export function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new AbortError();
  }
}
