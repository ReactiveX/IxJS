import { AsyncIterableX } from './asynciterablex';
import { fromEventPattern } from './fromeventpattern';
import { isFunction } from '../util/isiterable';

type CommonEventHandler = (...args: any[]) => void;

/** @ignore */
export interface OnOffEventEmitter {
  on(event: string | symbol, listener: CommonEventHandler): this;
  off(event: string | symbol, listener: CommonEventHandler): this;
}

/** @ignore */
export interface NodeEventEmitter {
  addListener(event: string | symbol, listener: CommonEventHandler): this;
  removeListener(event: string | symbol, listener: CommonEventHandler): this;
}

/** @ignore */
export type EventListenerOptions =
  | {
      capture?: boolean;
      passive?: boolean;
      once?: boolean;
    }
  | boolean;

/** @ignore */
export type EventedTarget = EventTarget | OnOffEventEmitter | NodeEventEmitter;

function isMessagePortEventEmitter(obj: any): obj is OnOffEventEmitter {
  return !!obj && isFunction(obj.on) && isFunction(obj.off);
}

function isNodeEventEmitter(obj: any): obj is NodeEventEmitter {
  return !!obj && isFunction(obj.addListener) && isFunction(obj.removeListener);
}

function isEventTarget(obj: any): obj is EventTarget {
  return !!obj && isFunction(obj.addEventListener) && isFunction(obj.removeEventListener);
}

export function fromEvent<TSource>(obj: EventedTarget, eventName: string): AsyncIterableX<TSource>;
export function fromEvent<TSource>(
  obj: EventedTarget,
  eventName: string,
  resultSelector: (...args: any[]) => TSource
): AsyncIterableX<TSource>;
export function fromEvent<TSource>(
  obj: EventedTarget,
  eventName: string,
  options: EventListenerOptions
): AsyncIterableX<TSource>;
export function fromEvent<TSource>(
  obj: EventedTarget,
  eventName: string,
  options: EventListenerOptions,
  resultSelector: (...args: any[]) => TSource
): AsyncIterableX<TSource>;

/**
 * Converts an event emitter event into an async-iterable stream.
 *
 * @template TSource The type of elements in the emitter stream.
 * @param {EventedTarget} obj The object that emits the events to turn into an async-iterable.
 * @param {string} type The name of the event to listen for creation of the async-iterable.
 * @param {EventListenerOptions} [options] The options for listening to the events such as capture, passive and once.
 * @param {(...args: any[]) => TSource} [resultSelector] The result selector for the event.
 * @returns {AsyncIterableX<TSource>} An async-iterable sequence created from the events emitted from the evented target.
 */
export function fromEvent<TSource>(
  obj: EventedTarget,
  type: string,
  options?: EventListenerOptions | ((...args: any[]) => TSource),
  resultSelector?: (...args: any[]) => TSource
): AsyncIterableX<TSource> {
  if (isFunction(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (isEventTarget(obj)) {
    const target = <EventTarget>obj;
    return fromEventPattern<TSource>(
      (h) => target.addEventListener(type, <EventListener>h, options as EventListenerOptions),
      (h) => target.removeEventListener(type, <EventListener>h, options as EventListenerOptions),
      resultSelector
    );
  } else if (isMessagePortEventEmitter(obj)) {
    const target = <OnOffEventEmitter>obj;
    return fromEventPattern<TSource>(
      (h) => target.on(type, h),
      (h) => target.off(type, h),
      resultSelector
    );
  } else if (isNodeEventEmitter(obj)) {
    const target = <NodeEventEmitter>obj;
    return fromEventPattern<TSource>(
      (h) => target.addListener(type, h),
      (h) => target.removeListener(type, h),
      resultSelector
    );
  } else {
    throw new TypeError('Unsupported event target');
  }
}
