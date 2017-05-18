import { AsyncIterableX } from '../../asynciterable';
import { tap } from '../../asynciterable/tap';
import { PartialObserver } from '../../observer';

export function tapProto<T>(this: AsyncIterableX<T>, observer: PartialObserver<T>): AsyncIterableX<T> {
  return tap(this, observer);
}

AsyncIterableX.prototype.tap = tapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    tap: typeof tapProto;
  }
}