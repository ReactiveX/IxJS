import { ScanOptions } from './operators/scanoptions';

export interface ReduceOptions<T, R> extends ScanOptions<T, R> {
  signal?: AbortSignal;
}
