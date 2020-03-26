import { IterableX } from '../../iterable/iterablex';
import { ScanRightIterable } from '../../iterable/operators/scanright';
import { ScanOptions } from '../../iterable/operators/scanoptions';

/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  options: ScanOptions<T, R>
): IterableX<R> {
  return new ScanRightIterable(this, options);
}

IterableX.prototype.scanRight = scanRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scanRight: typeof scanRightProto;
  }
}
