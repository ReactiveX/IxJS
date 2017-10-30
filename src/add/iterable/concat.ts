import { IterableX } from '../../iterable/iterablex';
import { concatStatic } from '../../iterable/concat';

IterableX.concat = concatStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let concat: typeof concatStatic; }
}
