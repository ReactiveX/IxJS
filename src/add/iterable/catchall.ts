import { Iterable } from '../../iterable';
import { catchAllStatic } from '../../iterable/catchall';

Iterable.catchAll = catchAllStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let catchAll: typeof catchAllStatic;
  }
}