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
 * Wraps the existing source as an async-iterable.
 * @param source The source to wrap as an async-iterable.
 */
export function as(source: string): AsyncIterableX<string>;
export function as<T>(source: AsyncIterableInput<T>): AsyncIterableX<T>;
export function as<T>(source: T): AsyncIterableX<T>;
/** @nocollapse */
export function as(source: any) {
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
