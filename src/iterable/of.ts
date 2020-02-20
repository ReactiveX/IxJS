import { IterableX } from './iterablex';

/** @nocollapse */
export function of<TSource>(...args: TSource[]): IterableX<TSource> {
  return new OfIterable<TSource>(args);
}

export class OfIterable<TSource> extends IterableX<TSource> {
  private _args: TSource[];

  constructor(args: TSource[]) {
    super();
    this._args = args;
  }

  *[Symbol.iterator]() {
    yield* this._args;
  }
}
