import { Iterable } from '../../iterable';
import { empty as emptyStatic } from '../../iterable/empty';

Iterable.empty = emptyStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let empty: typeof emptyStatic;
  }
}