import { fromEventPattern } from './fromeventpattern';

export type NodeEventEmitter  = {
  addListener: (eventName: string, handler: Function) => void;
  removeListener: (eventName: string, handler: Function) => void;
};

export type EventListenerOptions = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
} | boolean;

export type EventedTarget = EventTarget | NodeEventEmitter;

function isNodeEventEmitter(obj: any): obj is NodeEventEmitter {
  return !!obj && typeof obj.addListener === 'function' && typeof obj.removeListener === 'function';
}

function isEventTarget(obj: any): obj is EventTarget {
  return !!obj && typeof obj.addEventListener === 'function' && typeof obj.removeEventListener === 'function';
}

export function fromEvent<TSource>(
    obj: EventedTarget,
    type: string,
    options?: EventListenerOptions) {
  if (isEventTarget(obj)) {
    const target = <EventTarget>(obj);
    return fromEventPattern<TSource>(
      h => target.addEventListener(type, <EventListener>(h), options),
      h => target.removeEventListener(type, <EventListener>(h), options)
    );
  } else if (isNodeEventEmitter(obj)) {
    const target = <NodeEventEmitter>(obj);
    return fromEventPattern<TSource>(
      h => target.addListener(type, h),
      h => target.removeListener(type, h)
    );
  } else {
    throw new TypeError('Unsupported event target');
  }
}
