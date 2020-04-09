import { AsyncIterableInput, AsyncIterableX } from './asynciterablex';
import {
  isIterable,
  isAsyncIterable,
  isArrayLike,
  isObservable,
  isPromise,
} from '../util/isiterable';
import { identityAsync } from '../util/identity';
import {
  FromObservableAsyncIterable,
  FromPromiseIterable,
  FromAsyncIterable,
  FromArrayIterable,
} from './from';

/**
 * Converts an existing string into an async-iterable of characters.
 *
 * @export
 * @param {string} source The string to convert to an async-iterable.
 * @returns {AsyncIterableX<string>} An async-iterable stream of characters from the source.
 */
export function as(source: string): AsyncIterableX<string>;
/**
 * Converts the async iterable like input into an async-iterable.
 *
 * @export
 * @template T The type of elements in the async-iterable like sequence.
 * @param {AsyncIterableInput<T>} source The async-iterable like input to convert to an async-iterable.
 * @returns {AsyncIterableX<T>} An async-iterable stream from elements in the async-iterable like sequence.
 */
export function as<T>(source: AsyncIterableInput<T>): AsyncIterableX<T>;
/**
 * Converts the single element into an async-iterable sequence.
 *
 * @export
 * @template T The type of the input to turn into an async-iterable sequence.
 * @param {T} source The single element to turn into an async-iterable sequence.
 * @returns {AsyncIterableX<T>} An async-iterable sequence which contains the single element.
 */
export function as<T>(source: T): AsyncIterableX<T>;
/**
 * Converts the input into an async-iterable sequence.
 *
 * @export
 * @param {*} source The source to convert to an async-iterable sequence.
 * @returns {AsyncIterableX<*>} An async-iterable containing the input.
 */
/** @nocollapse */
export function as(source: any): AsyncIterableX<any> {
  if (source instanceof AsyncIterableX) {
    return source;
  }
  if (typeof source === 'string') {
    return new FromArrayIterable([source], identityAsync);
  }
  if (isIterable(source) || isAsyncIterable(source)) {
    return new FromAsyncIterable(source, identityAsync);
  }
  if (isPromise(source)) {
    return new FromPromiseIterable(source, identityAsync);
  }
  if (isObservable(source)) {
    return new FromObservableAsyncIterable(source, identityAsync);
  }
  if (isArrayLike(source)) {
    return new FromArrayIterable(source, identityAsync);
  }
  return new FromArrayIterable([source], identityAsync);
}
