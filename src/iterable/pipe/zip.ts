import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ZipIterable } from '../zip';
import { identity } from '../../internal/identity';

export function zip<T, T2>(
  source: Iterable<T>,
  source2: Iterable<T2>
): OperatorFunction<T, [T, T2]>;
export function zip<T, T2, T3>(
  source2: Iterable<T2>,
  source3: Iterable<T3>
): OperatorFunction<T, [T, T2, T3]>;
export function zip<T, T2, T3, T4>(
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): OperatorFunction<T, [T, T2, T3, T4]>;
export function zip<T, T2, T3, T4, T5>(
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): OperatorFunction<T, [T, T2, T3, T4, T5]>;
export function zip<T, T2, T3, T4, T5, T6>(
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>,
  source6: Iterable<T6>
): OperatorFunction<T, [T, T2, T3, T4, T5, T6]>;

export function zip<T, T2, R>(
  project: (values: [T, T2]) => R,
  source2: Iterable<T2>
): OperatorFunction<T, R>;
export function zip<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R,
  source2: Iterable<T2>,
  source3: Iterable<T3>
): OperatorFunction<T, R>;
export function zip<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): OperatorFunction<T, R>;
export function zip<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): OperatorFunction<T, R>;
export function zip<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>,
  source6: Iterable<T6>
): OperatorFunction<T, R>;

export function zip<T>(...sources: Iterable<T>[]): OperatorFunction<T, T[]>;
export function zip<T, R>(
  project: (values: T[]) => R,
  ...sources: Iterable<T>[]
): OperatorFunction<T, R>;
/* tslint:enable:max-line-length */
export function zip<T, R>(...sources: any[]): OperatorFunction<T, R> {
  return function zipOperatorFunction(source: Iterable<T>): IterableX<R> {
    let fn = (sources.shift() || identity) as (values: any[]) => R;
    if (fn && typeof fn !== 'function') {
      sources.unshift(fn);
      fn = identity;
    }
    return new ZipIterable<T, R>([source, ...sources] as Iterable<T>[], fn);
  };
}
