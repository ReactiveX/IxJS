import { IterableX } from '../../iterable';
import { range } from '../../iterable/range';

function _range(start: number, count: number): IterableX<number> {
  return new IterableX(range(start, count));
}

IterableX.range = _range;

declare module '../../iterable' {
  namespace IterableX {
    export let range: typeof _range;
  }
}