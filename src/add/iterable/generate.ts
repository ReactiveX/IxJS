import { IterableX } from '../../iterable/iterablex';
import { generate as generateStatic } from '../../iterable/generate';

/** @nocollapse */
IterableX.generate = generateStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let generate: typeof generateStatic;
  }
}
