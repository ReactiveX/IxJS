import { AsyncIterableX } from '../asynciterable';

class AnonymousAsyncIterable<T> extends AsyncIterableX<T> {
  private _fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>;

  constructor(fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    let it = await this._fn(), next: IteratorResult<T> | undefined;
    while (!(next = await it.next()).done) {
      yield next.value;
    }
  }
}

export function create<T>(fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>): AsyncIterableX<T> {
  return new AnonymousAsyncIterable(fn);
}
