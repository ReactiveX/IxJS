import { AsyncIterableX } from '../../asynciterable';
import { generateTime as generateTimeStatic } from '../../asynciterable/generatetime';

AsyncIterableX.generateTime = generateTimeStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let generateTime: typeof generateTimeStatic;
  }
}