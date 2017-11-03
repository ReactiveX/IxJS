import { IterableX } from '../../iterable/iterablex';
import { zip as zipStatic } from '../../iterable/zip';

IterableX.zip = zipStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let zip: typeof zipStatic; }
}
