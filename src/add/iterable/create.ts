import { IterableX } from '../../iterable/iterablex';
import { create as createStatic } from '../../iterable/create';

IterableX.create = createStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let create: typeof createStatic; }
}
