import { IterableX } from '../iterablex';
import { PartialObserver } from '../../observer';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class TapIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _observer: PartialObserver<TSource>;

  constructor(source: Iterable<TSource>, observer: PartialObserver<TSource>) {
    super();
    this._source = source;
    this._observer = observer;
  }

  *[Symbol.iterator]() {
    const it = this._source[Symbol.iterator]();
    while (1) {
      let next;
      try {
        next = it.next();
        if (next.done) {
          break;
        }
      } catch (e) {
        if (this._observer.error) {
          this._observer.error(e);
        }
        throw e;
      }

      if (this._observer.next) {
        this._observer.next(next.value);
      }
      yield next.value;
    }

    if (this._observer.complete) {
      this._observer.complete();
    }
  }
}

export function tap<TSource>(
  observer: PartialObserver<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function tapOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TapIterable<TSource>(source, observer);
  };
}
