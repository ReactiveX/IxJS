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

/**
 * Converts an event emitter event into an async-iterable stream.
 *
 * @export
 * @template TSource The type of elements in the emitter stream.
 * @param {EventedTarget} obj The object that emits the events to turn into an async-iterable.
 * @param {string} type The name of the event to listen for creation of the async-iterable.
 * @param {EventListenerOptions} [options] The options for listening to the events such as capture, passive and once.
 * @returns {AsyncIterableX<TSource>} An async-iterable sequence created from the events emitted from the evented target.
 */
export function fromEvent<TSource>(
  obj: EventedTarget,
  type: string,
  options?: EventListenerOptions
): AsyncIterableX<TSource> {
  if (isEventTarget(obj)) {
    const target = <EventTarget>obj;
    return fromEventPattern<TSource>(
      (h) => target.addEventListener(type, <EventListener>h, options),
      (h) => target.removeEventListener(type, <EventListener>h, options)
    );
  } else if (isNodeEventEmitter(obj)) {
    const target = <NodeEventEmitter>obj;
    return fromEventPattern<TSource>(
      (h) => target.addListener(type, h),
      (h) => target.removeListener(type, h)
    );
  } else {
    throw new TypeError('Unsupported event target');
  }
}
