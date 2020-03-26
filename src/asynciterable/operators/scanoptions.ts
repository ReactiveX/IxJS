import { AbortSignal } from '../../abortsignal';

export interface ScanOptions<T, R> {
  seed?: R;
  callback: (accumulator: R, current: T, index: number, signal?: AbortSignal) => R | Promise<R>;
}
