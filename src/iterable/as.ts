import { IterableX } from './iterablex';
import { FromIterable } from './from';
import { OfIterable } from './of';
import { isIterable, isArrayLike } from '../util/isiterable';
import { identity } from '../util/identity';

export function as(source: string): IterableX<string>;
export function as<T>(source: Iterable<T>): IterableX<T>;
export function as<T>(source: ArrayLike<T>): IterableX<T>;
export function as<T>(source: T): IterableX<T>;
/** @nocollapse */
export function as(source: any) {
  /* tslint:disable */
  if (typeof source === 'string') {
    return new OfIterable([source]);
  }
  if (isIterable(source)) {
    return new FromIterable(source, identity);
  }
  if (isArrayLike(source)) {
    return new FromIterable(source, identity);
  }
  return new OfIterable([source]);
  /* tslint:enable */
}
