import { IterableX } from '../../iterable/iterablex.js';
import { ScanRightIterable } from '../../iterable/operators/scanright.js';
import { ScanOptions } from '../../iterable/operators/scanoptions.js';

/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  options: ScanOptions<T, R>
): IterableX<R>;
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (accumulator: R, current: T, index: number) => R,
  seed?: R
): IterableX<R>;
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  optionsOrAccumulator: ScanOptions<T, R> | ((accumulator: R, current: T, index: number) => R),
  seed?: R
): IterableX<R> {
  return new ScanRightIterable(
    this,
    // eslint-disable-next-line no-nested-ternary
    typeof optionsOrAccumulator === 'function'
      ? arguments.length > 1
        ? // prettier-ignore
          { 'callback': optionsOrAccumulator, 'seed': seed }
        : // prettier-ignore
          { 'callback': optionsOrAccumulator }
      : optionsOrAccumulator
  );
}

IterableX.prototype.scanRight = scanRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scanRight: typeof scanRightProto;
  }
}
