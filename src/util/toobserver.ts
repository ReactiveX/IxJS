import { isFunction } from './isiterable';
import { Observer, PartialObserver } from '../observer';

const noop = (_?: any) => {
  /**/
};

// eslint-disable-next-line complexity
export function toObserver<T>(
  next?: PartialObserver<T> | ((value: T) => void) | null,
  error?: ((err: any) => void) | null,
  complete?: (() => void) | null
): Observer<T> {
  const observer = next as PartialObserver<T>;

  if (observer && typeof observer === 'object') {
    return {
      next: isFunction(observer.next) ? (x) => observer.next!(x) : noop,
      error: isFunction(observer.error) ? (e) => observer.error!(e) : noop,
      complete: isFunction(observer.complete) ? () => observer.complete!() : noop,
    };
  }

  return {
    next: isFunction(next) ? next : noop,
    error: isFunction(error) ? error : noop,
    complete: isFunction(complete) ? complete : noop,
  };
}
