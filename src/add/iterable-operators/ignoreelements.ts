import { IterableX } from '../../iterable';
import { ignoreElements } from '../../iterable/ignoreelements';

function ignoreElementsProto<T>(
    this: IterableX<T>): IterableX<T> {
  return new IterableX(ignoreElements(this));
}

IterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../iterable' {
  interface IterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}