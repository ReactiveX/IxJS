import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ScanAsyncIterable } from '../../asynciterable/operators/scan.js';
import { ScanOptions } from '../../asynciterable/operators/scanoptions.js';

/**
 * @ignore
 */
export function scanProto<T, R = T>(
  this: AsyncIterableX<T>,
  options: ScanOptions<T, R>
): AsyncIterableX<R> {
  return new ScanAsyncIterable(this, options);
}

AsyncIterableX.prototype.scan = scanProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    scan: typeof scanProto;
  }
}
