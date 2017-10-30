import { IterableX } from '../../iterable/iterablex';
import { range as rangeStatic } from '../../iterable/range';

IterableX.range = rangeStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let range: typeof rangeStatic; }
}
