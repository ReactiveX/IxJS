import { IterableX } from './iterablex';

/**
 * Creates an iterable from the specified elements.
 *
 * @template TSource The type of the elements to create an iterable sequence.
 * @param {...TSource[]} args The elements to turn into an iterable sequence.
 * @returns {IterableX<TSource>} The iterable sequence created from the elements.
 */
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
