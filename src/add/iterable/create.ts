import { IterableX } from '../../iterable';
import { create as createStatic } from '../../iterable/create';

IterableX.create = createStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let create: typeof createStatic;
  }
}