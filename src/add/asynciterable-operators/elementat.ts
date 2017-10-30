import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { elementAt } from '../../asynciterable/elementat';

/**
 * @ignore
 */
export function elementAtProto<T>(this: AsyncIterableX<T>, index: number) {
  return elementAt<T>(this, index);
}

AsyncIterableX.prototype.elementAt = elementAtProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    elementAt: typeof elementAtProto;
  }
}
