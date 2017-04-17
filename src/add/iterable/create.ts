import { IterableX } from '../../iterable';
import { create as createStatic } from '../../iterable/create';

IterableX.create = createStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let create: typeof createStatic;
  }
}