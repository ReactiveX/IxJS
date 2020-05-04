import { IterableX } from './iterablex';
import { FromIterable } from './from';
import { isIterable, isArrayLike } from '../util/isiterable';
import { identity } from '../util/identity';

/**
 * Converts an existing string into an iterable of characters.
 *
 * @export
 * @param {string} source The string to convert to an iterable.
 * @returns {IterableX<string>} An terable stream of characters from the source.
 */
export function as(source: string): IterableX<string>;
/**
 * Converts the iterable like input into an iterable.
 *
 * @export
 * @template T The tyep of elements in the source iterable.
 * @param {Iterable<T>} source The iterable to convert to an iterable.
 * @returns {IterableX<T>} An iterable stream of the source sequence.
 */
export function as<T>(source: Iterable<T>): IterableX<T>;
/**
 * Converts an array-like object to an iterable.
 *
 * @export
 * @template T The type of elements in the source array-like sequence.
 * @param {ArrayLike<T>} source The array-like sequence to convert to an iterable.
 * @returns {IterableX<T>} The iterable containing the elements from the array-like sequence.
 */
export function as<T>(source: ArrayLike<T>): IterableX<T>;
/**
 * Converts the object into a singleton in an iterable sequence.
 *
 * @export
 * @template T The type of element to turn into an iterable sequence.
 * @param {T} source The item to turn into an iterable sequence.
 * @returns {IterableX<T>} An iterable sequence from the source object.
 */
export function as<T>(source: T): IterableX<T>;
/** @nocollapse */
export function as(source: any) {
  if (source instanceof IterableX) {
    return source;
  }
  if (typeof source === 'string') {
    return new FromIterable([source], identity);
  }
  if (isIterable(source)) {
    return new FromIterable(source, identity);
  }
  if (isArrayLike(source)) {
    return new FromIterable(source, identity);
  }
  return new FromIterable([source], identity);
}
