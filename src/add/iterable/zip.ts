import { Iterable } from '../../iterable';
import { zipStatic } from '../../iterable/zip';

Iterable.zip = zipStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let zip: typeof zipStatic;
  }
}