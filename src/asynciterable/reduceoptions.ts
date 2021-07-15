import { ScanOptions } from './operators/scanoptions';

/**
 * The reduce options which includes an accumulator function, optional seed, and optional abort signal for cancellation.
 *
 * @interface ReduceOptions
 * @extends {ScanOptions<T, R>}
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 */
export interface ReduceOptions<T, R> extends ScanOptions<T, R> {
  /**
   * An optional abort signal to cancel the operation at any time.
   *
   * @type {AbortSignal}
   * @memberof ReduceOptions
   */
  signal?: AbortSignal;
}
