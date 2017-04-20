import { IterableX } from '../../iterable';
import { catchAllStatic } from '../../iterable/catchall';

IterableX.catchAll = catchAllStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let catchAll: typeof catchAllStatic;
  }
}