import { IterableX } from '../iterable';

export class EndWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _args: TSource[];

  constructor(source: Iterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  *[Symbol.iterator]() {
    for (let item of this._source) {
      yield item;
    }
    for (let x of this._args) {
      yield x;
    }
  }
}

export function endWith<TSource>(
  source: Iterable<TSource>,
  ...args: TSource[]
): IterableX<TSource> {
  return new EndWithIterable<TSource>(source, args);
}
