import { AsyncIterableX } from '../../asynciterable';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern';

/**
 * @ignore
 */
export function _fromEventPattern<TSource>(
  addHandler: (handler: Function) => void,
  removeHandler: (handler: Function) => void): AsyncIterable<TSource> {
  return fromEventPatternStatic<TSource>(addHandler, removeHandler);
}

AsyncIterableX.fromEventPattern = _fromEventPattern;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let fromEventPattern: typeof _fromEventPattern;
  }
}