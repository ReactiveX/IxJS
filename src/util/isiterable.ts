import { Observable } from '../observer';

/** @ignore */
const isNumber = (x: any) => typeof x === 'number';
/** @ignore */
const isBoolean = (x: any) => typeof x === 'boolean';
/** @ignore */
export const isFunction = (x: any): x is Function => typeof x === 'function';
/** @ignore */
export const isObject = (x: any): x is Object => x != null && Object(x) === x;

/** @ignore */
export const isPromise = (x: any): x is PromiseLike<any> => {
  return isObject(x) && isFunction(x.then);
};

/** @ignore */
export function isArrayLike(x: any): x is ArrayLike<any> {
  return isObject(x) && isNumber(x['length']);
}

/** @ignore */
export function isIterable(x: any): x is Iterable<any> {
  return x != null && isFunction(x[Symbol.iterator]);
}

/** @ignore */
export function isIterator(x: any): x is Iterable<any> {
  return isObject(x) && !isFunction(x[Symbol.iterator]) && isFunction(x['next']);
}

/** @ignore */
export function isAsyncIterable(x: any): x is AsyncIterable<any> {
  return isObject(x) && isFunction(x[Symbol.asyncIterator]);
}

/** @ignore */
export function isObservable(x: any): x is Observable<any> {
  return x != null && Object(x) === x && typeof x['subscribe'] === 'function';
}

/** @ignore */
export const isReadableNodeStream = (x: any): x is NodeJS.ReadableStream => {
  return (
    isObject(x) &&
    isFunction(x['pipe']) &&
    isFunction(x['_read']) &&
    isBoolean(x['readable']) &&
    isObject(x['_readableState'])
  );
};

/** @ignore */
export const isWritableNodeStream = (x: any): x is NodeJS.WritableStream => {
  return (
    isObject(x) &&
    isFunction(x['end']) &&
    isFunction(x['_write']) &&
    isBoolean(x['writable']) &&
    isObject(x['_writableState'])
  );
};

/** @ignore */
export const isReadableDOMStream = <T = any>(x: any): x is ReadableStream<T> => {
  return isObject(x) && isFunction(x['cancel']) && isFunction(x['getReader']);
};

/** @ignore */
export const isWritableDOMStream = <T = any>(x: any): x is WritableStream<T> => {
  return isObject(x) && isFunction(x['abort']) && isFunction(x['getWriter']);
};

/** @ignore */
export const isFetchResponse = (x: any): x is Response => {
  return isObject(x) && isReadableDOMStream(x['body']);
};
