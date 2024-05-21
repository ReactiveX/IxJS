import { IterableX } from '../../iterable/iterablex.js';
import { generate as generateStatic } from '../../iterable/generate.js';

/** @nocollapse */
IterableX.generate = generateStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let generate: typeof generateStatic;
  }
}
