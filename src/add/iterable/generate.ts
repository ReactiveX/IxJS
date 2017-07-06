import { IterableX } from '../../iterable';
import { generate as generateStatic } from '../../iterable/generate';

IterableX.generate = generateStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let generate: typeof generateStatic;
  }
}