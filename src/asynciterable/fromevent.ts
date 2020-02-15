import { AsyncIterableX } from './asynciterablex';
import { fromEventPattern } from './fromeventpattern';

export interface NodeEventEmitter {
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}

export type EventListenerOptions =
  | {
    capture?: boolean;
    passive?: boolean;
    once?: boolean;
  }
  | boolean;

export type EventedTarget = EventTarget | NodeEventEmitter;

function isNodeEventEmitter(obj: any): obj is NodeEventEmitter {
  return !!obj && typeof obj.addListener === 'function' && typeof obj.removeListener === 'function';
}

function isEventTarget(obj: any): obj is EventTarget {
  return (
    !!obj &&
    typeof obj.addEventListener === 'function' &&
    typeof obj.removeEventListener === 'function'
  );
}

export function fromEvent<TSource>(
  obj: EventedTarget,
  type: string,
  options?: EventListenerOptions
): AsyncIterableX<TSource> {
  if (isEventTarget(obj)) {
    const target = <EventTarget>obj;
    return fromEventPattern<TSource>(
      h => target.addEventListener(type, <EventListener>h, options),
      h => target.removeEventListener(type, <EventListener>h, options)
    );
  } else if (isNodeEventEmitter(obj)) {
    const target = <NodeEventEmitter>obj;
    return fromEventPattern<TSource>(
      h => target.addListener(type, h),
      h => target.removeListener(type, h)
    );
  } else {
    throw new TypeError('Unsupported event target');
  }
}
