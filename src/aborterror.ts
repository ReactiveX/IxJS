export class AbortError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, AbortError.prototype);
    this.message = 'The operation has been aborted';
  }
}

export function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new AbortError();
  }
}
