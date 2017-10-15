import { IterableX } from '../../iterable';
import { zip } from '../../iterable/zip';

/**
 * @ignore
 */
/* tslint:disable:max-line-length */
export function zipProto<T, T2>(this: IterableX<T>, source2: Iterable<T2>): IterableX<[T, T2]>;
export function zipProto<T, T2, T3>(this: IterableX<T>, source2: Iterable<T2>, source3: Iterable<T3>): IterableX<[T, T2, T3]>;
export function zipProto<T, T2, T3, T4>(this: IterableX<T>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>): IterableX<[T, T2, T3, T4]>;
export function zipProto<T, T2, T3, T4, T5>(this: IterableX<T>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>): IterableX<[T, T2, T3, T4, T5]>;
export function zipProto<T, T2, T3, T4, T5, T6>(this: IterableX<T>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, source6: Iterable<T6>): IterableX<[T, T2, T3, T4, T5, T6]>;

export function zipProto<T, R>(this: IterableX<T>, project: (values: [T]) => R): IterableX<R>;
export function zipProto<T, T2, R>(this: IterableX<T>, project: (values: [T, T2]) => R, source2: Iterable<T2>): IterableX<R>;
export function zipProto<T, T2, T3, R>(this: IterableX<T>, project: (values: [T, T2, T3]) => R, source2: Iterable<T2>, source3: Iterable<T3>): IterableX<R>;
export function zipProto<T, T2, T3, T4, R>(this: IterableX<T>, project: (values: [T, T2, T3, T4]) => R, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>): IterableX<R>;
export function zipProto<T, T2, T3, T4, T5, R>(this: IterableX<T>, project: (values: [T, T2,T3, T4, T5]) => R, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>): IterableX<R>;
export function zipProto<T, T2, T3, T4, T5, T6, R>(this: IterableX<T>, project: (values: [T, T2, T3, T4, T5, T6]) => R, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, source6: Iterable<T6>): IterableX<R>;

export function zipProto<T>(this: IterableX<T>, ...sources: Iterable<T>[]): IterableX<T[]>;
export function zipProto<T, R>(this: IterableX<T>, project: (values: T[]) => R, ...sources: Iterable<T>[]): IterableX<R>;
/* tslint:enable:max-line-length */
export function zipProto<T, R>(this: IterableX<T>, ...args: any[]): IterableX<R> {
  let [arg1, ...sources] = args;
  sources = (typeof arg1 === 'function') ?
    [this, ...sources] : (arg1 = this) && args;
  return zip<T, R>(arg1, ...sources) as IterableX<R>;
}

IterableX.prototype.zip = zipProto;

declare module '../../iterable' {
  interface IterableX<T> {
    zip: typeof zipProto;
  }
}