const ARRAY_VALUE = 'value';
const ARRAY_ERROR = 'error';

interface AsyncSinkItem<T> {
  type: string;
  value?: T;
  error?: any;
}

interface AsyncResolver<T> {
  resolve: (value?: T | PromiseLike<T> | undefined) => void;
  reject: (reason?: any) => void;
}

export class AsyncSink<TSource> implements AsyncIterableIterator<TSource> {
  private _ended: boolean;
  private _values: AsyncSinkItem<TSource>[];
  private _resolvers: AsyncResolver<IteratorResult<TSource>>[];

  constructor() {
    this._ended = false;
    this._values = [];
    this._resolvers = [];
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  write(value: TSource) {
    this._push({ type: ARRAY_VALUE, value });
  }

  error(error: any) {
    this._push({ type: ARRAY_ERROR, error });
  }

  private _push(item: AsyncSinkItem<TSource>) {
    if (this._ended) {
      throw new Error('AsyncSink already ended');
    }

    if (this._resolvers.length > 0) {
      const {resolve, reject } = this._resolvers.shift()!;
      if (item.type === ARRAY_ERROR) {
        reject(item.error!);
      } else {
        resolve({ done: false, value: item.value! });
      }
    } else {
      this._values.push(item);
    }
  }

  next() {
    if (this._values.length > 0) {
      const { type, value, error } = this._values.shift()!;
      if (type === ARRAY_ERROR) {
        return Promise.reject(error);
      } else {
        return Promise.resolve({ done: false, value } as IteratorResult<TSource>);
      }
    }

    if (this._ended) {
      return Promise.resolve({ done: true } as IteratorResult<TSource>);
    }

    return new Promise<IteratorResult<TSource>>((resolve, reject) => {
      this._resolvers.push({ resolve, reject });
    });
  }

  end() {
    while (this._resolvers.length > 0) {
      this._resolvers.shift()!.resolve({ done: true } as IteratorResult<TSource>);
    }
    this._ended = true;
  }
}
