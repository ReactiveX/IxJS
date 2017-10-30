import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ignoreElements } from '../../asynciterable/ignoreelements';

/**
 * @ignore
 */
export function ignoreElementsProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T> {
  return ignoreElements(this);
}

AsyncIterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}
