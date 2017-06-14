import { AsyncIterableX } from '../../asynciterable';
import { elementAt } from '../../asynciterable/elementat';

/**
 * @ignore
 */
export function elementAtProto<T>(this: AsyncIterableX<T>, index: number) {
  return elementAt<T>(this, index);
}

AsyncIterableX.prototype.elementAt = elementAtProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    elementAt: typeof elementAtProto;
  }
}