import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class SliceIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: Iterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  *[Symbol.iterator]() {
    const it = this._source[Symbol.iterator]();
    let begin = this._begin;
    let next;
    while (begin > 0 && !(next = it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = it.next()).done) {
        yield next.value;
        if (--end === 0) {
          break;
        }
      }
    }
  }
}

export function slice<TSource>(
  begin: number,
  end: number = Infinity
): MonoTypeOperatorFunction<TSource> {
  return function sliceOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SliceIterable<TSource>(source, begin, end);
  };
}
