import { AsyncIterableX } from '../../asynciterable';
import { last } from '../../asynciterable/last';

/**
 * @ignore
 */
export function lastProto<T>(
    this: AsyncIterableX<T>,
    selector: (value: T) => boolean | Promise<boolean> = async () => true): Promise<T | undefined> {
  return last(this, selector);
}

AsyncIterableX.prototype.last = lastProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    last: typeof lastProto;
  }
}