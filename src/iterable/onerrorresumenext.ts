import { IterableX } from '../iterable';

class OnErrorResumeNextIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (let item of this._source) {
      let it = item[Symbol.iterator]();
      while (1) {
        let next;
        try {
          next = it.next();
        } catch (e) {
          break;
        }

        if (next.done) { break; }
        yield next.value;
      }
    }
  }
}

export function onErrorResumeNext<T>(source: Iterable<T>, ...args: Iterable<T>[]): IterableX<T> {
  return new OnErrorResumeNextIterable<T>([source, ...args]);
}

export function onErrorResumeNextStatic<T>(...source: Iterable<T>[]): IterableX<T> {
  return new OnErrorResumeNextIterable<T>(source);
}
