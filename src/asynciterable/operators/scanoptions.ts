/**
 * The options for performing a scan operation, including the callback and the optional seed.
 *
 * @interface ScanOptions
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of the result for the reducer callback.
 */
export interface ScanOptions<TSource, TResult> {
  /**
   * The optional seed used for the scan operation.
   *
   * @type {TResult} The type of the result
   * @memberof ScanOptions
   */
  seed?: TResult;

  /**
   * The callback used for the scan operation, which passes the accumulator, current value, the
   * current index, and an Abort Signal.  This returns a result or a Promise containing a result.
   *
   * @memberof ScanOptions
   */
  callback: (
    accumulator: TResult,
    current: TSource,
    index: number,
    signal?: AbortSignal
  ) => TResult | Promise<TResult>;
}
