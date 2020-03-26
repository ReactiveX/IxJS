import { IterableX } from '../../iterable/iterablex';
import { ScanIterable } from '../../iterable/operators/scan';
import { ScanOptions } from '../../iterable/operators/scanoptions';

/**
 * @ignore
 */
export function scanProto<T, R = T>(this: IterableX<T>, options: ScanOptions<T, R>): IterableX<R> {
  return new ScanIterable(this, options);
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}
