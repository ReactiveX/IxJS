import { Iterable } from '../../iterable';
import { create as createStatic } from '../../iterable/create';

Iterable.create = createStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let create: typeof createStatic;
  }
}