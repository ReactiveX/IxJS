import { AsyncIterableX } from './asynciterablex';

class AnonymousAsyncIterable<T> extends AsyncIterableX<T> {
  private _fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>;

  constructor(fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const it = await this._fn();
    let next: IteratorResult<T> | undefined;
    while (!(next = await it.next()).done) {
      yield next.value;
    }
  }
}

export function create<T>(
  fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>
): AsyncIterableX<T> {
  return new AnonymousAsyncIterable(fn);
}
