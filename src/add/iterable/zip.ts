import { IterableImpl } from '../../iterable';
import { zipStatic } from '../../iterable/zip';

IterableImpl.zip = zipStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let zip: typeof zipStatic;
  }
}