import { IterableX } from './iterablex';

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

/** @nocollapse */
export function of<TSource>(...args: TSource[]): IterableX<TSource> {
  //tslint:disable-next-line
  return new OfIterable<TSource>(args);
}
