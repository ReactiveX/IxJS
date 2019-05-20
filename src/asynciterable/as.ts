import { AsyncIterableInput, AsyncIterableX } from './asynciterablex';
import { isIterable, isAsyncIterable, isArrayLike } from '../util/isiterable';
import { identityAsync } from '../util/identity';
import {
  isObservable,
  isPromise,
  FromObservableAsyncIterable,
  FromPromiseIterable,
  FromAsyncIterable,
  FromArrayIterable
} from './from';
import { OfAsyncIterable } from './of';

export function as(source: string): AsyncIterableX<string>;
export function as<T>(source: AsyncIterableInput<T>): AsyncIterableX<T>;
export function as<T>(source: T): AsyncIterableX<T>;
/** @nocollapse */
export function as(source: any) {
  /* tslint:disable */
  if (source instanceof AsyncIterableX) {
    return source;
  }
  if (typeof source === 'string') {
    return new OfAsyncIterable([source]);
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
  return new OfAsyncIterable([source]);
  /* tslint:enable */
}
