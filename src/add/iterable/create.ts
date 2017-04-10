import { IterableImpl } from '../../iterable';
import { create as createStatic } from '../../iterable/create';

IterableImpl.create = createStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let create: typeof createStatic;
  }
}