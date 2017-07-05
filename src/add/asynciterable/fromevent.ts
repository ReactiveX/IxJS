import { AsyncIterableX } from '../../asynciterable';
import { fromEvent as fromEventStatic, EventListenerOptions, EventedTarget } from '../../asynciterable/fromevent';

/**
 * @ignore
 */
export function _fromEvent<TSource>(
  obj: EventedTarget,
  type: string,
  options?: EventListenerOptions) {
  return fromEventStatic<TSource>(obj, type, options);
}

AsyncIterableX.fromEvent = _fromEvent;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let fromEvent: typeof _fromEvent;
  }
}