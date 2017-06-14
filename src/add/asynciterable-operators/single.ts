import { AsyncIterableX } from '../../asynciterable';
import { single } from '../../asynciterable/single';

/**
 * @ignore
 */
export function singleProto<T>(
    this: AsyncIterableX<T>,
    selector: (value: T) => boolean | Promise<boolean> = async () => true): Promise<T | undefined> {
  return single(this, selector);
}

AsyncIterableX.prototype.single = singleProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    single: typeof singleProto;
  }
}