import { IterableX } from '../../iterable/iterablex';
import { generate as generateStatic } from '../../iterable/generate';

IterableX.generate = generateStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let generate: typeof generateStatic; }
}
