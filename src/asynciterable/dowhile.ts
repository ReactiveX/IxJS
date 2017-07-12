import { AsyncIterableX } from '../asynciterable';
import { concatStatic } from './concat';
import { _while } from './while';

export function doWhile<TSource>(source: AsyncIterable<TSource>, condition: () => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return concatStatic(source, _while(condition, source));
}
