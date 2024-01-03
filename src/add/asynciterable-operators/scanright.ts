import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ScanRightAsyncIterable } from '../../asynciterable/operators/scanright.js';
import { ScanOptions } from '../../asynciterable/operators/scanoptions.js';

/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  options: ScanOptions<T, R>
): AsyncIterableX<R> {
  return new ScanRightAsyncIterable(this, options);
}

AsyncIterableX.prototype.scanRight = scanRightProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    scanRight: typeof scanRightProto;
  }
}
