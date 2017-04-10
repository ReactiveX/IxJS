import { IterableImpl } from '../../iterable';
import { catchAllStatic } from '../../iterable/catchall';

IterableImpl.catchAll = catchAllStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let catchAll: typeof catchAllStatic;
  }
}