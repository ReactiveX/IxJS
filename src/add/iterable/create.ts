import { IterableX } from '../../iterable/iterablex.js';
import { create as createStatic } from '../../iterable/create.js';

/** @nocollapse */
IterableX.create = createStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let create: typeof createStatic;
  }
}
