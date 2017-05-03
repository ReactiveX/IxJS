import { IterableX } from '../../iterable';
import { _while } from '../../iterable/while';

export function _whileProto<T>(
    this: IterableX<T>,
    condition: () => boolean): IterableX<T> {
  return new IterableX(_while(this, condition));
}

IterableX.prototype.while = _whileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    while: typeof _whileProto;
  }
}