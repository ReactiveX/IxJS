import { AsyncIterableX } from '../../asynciterable';
import { ignoreElements } from '../../asynciterable/ignoreelements';

export function ignoreElementsProto<T>(
    this: AsyncIterableX<T>): AsyncIterableX<T> {
  return ignoreElements(this);
}

AsyncIterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}