import { IterableX } from '../iterable';

class StartWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _args: TSource[];

  constructor(source: Iterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  *[Symbol.iterator]() {
    for (let x of this._args) { yield x; }
    for (let item of this._source) { yield item; }
  }
}

export function startWith<TSource>(
    source: Iterable<TSource>,
    ...args: TSource[]): IterableX<TSource> {
  return new StartWithIterable<TSource>(source, args);
}
