import { IterableX } from '../../iterable/iterablex';
import { ScanIterable } from '../../iterable/operators/scan';
import { ScanOptions } from '../../iterable/operators/scanoptions';

/**
 * @ignore
 */
export function scanProto<T, R = T>(this: IterableX<T>, options: ScanOptions<T, R>): IterableX<R>;
export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (accumulator: R, current: T, index: number) => R,
  seed?: R
): IterableX<R>;
export function scanProto<T, R = T>(
  this: IterableX<T>,
  optionsOrAccumulator: ScanOptions<T, R> | ((accumulator: R, current: T, index: number) => R),
  seed?: R
): IterableX<R> {
  return new ScanIterable(
    this,
    // eslint-disable-next-line no-nested-ternary
    typeof optionsOrAccumulator === 'function'
      ? arguments.length > 1
        ? { 'callback': optionsOrAccumulator, 'seed': seed }
        : { 'callback': optionsOrAccumulator }
      : optionsOrAccumulator
  );
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}
