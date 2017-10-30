import { IterableX } from '../../iterable/iterablex';
import { empty as emptyStatic } from '../../iterable/empty';

IterableX.empty = emptyStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let empty: typeof emptyStatic; }
}
