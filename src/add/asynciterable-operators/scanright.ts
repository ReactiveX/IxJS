import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ScanRightAsyncIterable } from '../../asynciterable/operators/scanright';
import { ScanOptions } from 'ix/asynciterable/operators/scanoptions';

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
