import { IterableX } from './iterablex';

class WhileIterable<TSource> extends IterableX<TSource> {
  private _condition: () => boolean;
  private _source: Iterable<TSource>;

  constructor(condition: () => boolean, source: Iterable<TSource>) {
    super();
    this._condition = condition;
    this._source = source;
  }

  *[Symbol.iterator]() {
    while (this._condition()) {
      yield* this._source;
    }
  }
}

export function whileDo<TSource>(
  condition: () => boolean,
  source: Iterable<TSource>
): IterableX<TSource> {
  return new WhileIterable<TSource>(condition, source);
}
