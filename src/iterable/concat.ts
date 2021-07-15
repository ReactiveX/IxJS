import { IterableX } from './iterablex';

export class ConcatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (const outer of this._source) {
      yield* outer;
    }
  }
}

export function concat<T>(v1: Iterable<T>): IterableX<T>;
/**
 * Concatenates the second iterable sequence to the first iterable sequence upon successful termination of the first.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {Iterable<T>} v1 First iterable source.
 * @param {Iterable<T2>} v2 Second iterable source.
 * @returns {(IterableX<T | T2>)} An iterable sequence that contains the elements of the first sequence,
 * followed by those of the second the sequence.
 */
export function concat<T, T2>(v1: Iterable<T>, v2: Iterable<T2>): IterableX<T | T2>;
/**
 * Concatenates all iterable sequences in the given sequences, as long as the previous iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @param {Iterable<T>} v1 First iterable source.
 * @param {Iterable<T2>} v2 Second iterable source.
 * @param {Iterable<T3>} v3 Third iterable source.
 * @returns {(IterableX<T | T2 | T3>)} An iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>
): IterableX<T | T2 | T3>;
/**
 * Concatenates all iterable sequences in the given sequences, as long as the previous iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {Iterable<T>} v1 First iterable source.
 * @param {Iterable<T2>} v2 Second iterable source.
 * @param {Iterable<T3>} v3 Third iterable source.
 * @param {Iterable<T4>} v4 Fourth iterable source.
 * @returns {(IterableX<T | T2 | T3 | T4>)} An iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>
): IterableX<T | T2 | T3 | T4>;
/**
 * Concatenates all iterable sequences in the given sequences, as long as the previous iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {Iterable<T>} v1 First iterable source.
 * @param {Iterable<T2>} v2 Second iterable source.
 * @param {Iterable<T3>} v3 Third iterable source.
 * @param {Iterable<T4>} v4 Fourth iterable source.
 * @param {Iterable<T5>} v5 Fifth iterable source.
 * @returns {(Iterable<T | T2 | T3 | T4 | T5>)} An iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4, T5>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>
): Iterable<T | T2 | T3 | T4 | T5>;
/**
 * Concatenates all iterable sequences in the given sequences, as long as the previous iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @template T6 The type of the elements in the sixth source sequence.
 * @param {Iterable<T>} v1 First iterable source.
 * @param {Iterable<T2>} v2 Second iterable source.
 * @param {Iterable<T3>} v3 Third iterable source.
 * @param {Iterable<T4>} v4 Fourth iterable source.
 * @param {Iterable<T5>} v5 Fifth iterable source.
 * @param {Iterable<T6>} v6 Sixth iterable source.
 * @returns {(Iterable<T | T2 | T3 | T4 | T5 | T6>)}  An iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T, T2, T3, T4, T5, T6>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>,
  v6: Iterable<T6>
): Iterable<T | T2 | T3 | T4 | T5 | T6>;

/**
 * Concatenates all iterable sequences in the given sequences, as long as the previous iterable
 * sequence terminated successfully.
 *
 * @template T The type of the elements in the sequences.
 * @param {...Iterable<T>[]} args The iterable sources.
 * @returns {IterableX<T>} An iterable sequence that contains the elements of each given sequence, in sequential order.
 */
export function concat<T>(...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable<T>(args);
}
