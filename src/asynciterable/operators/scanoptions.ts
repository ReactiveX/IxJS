/**
 * The options for performing a scan operation, including the callback and the optional seed.
 *
 * @export
 * @interface ScanOptions
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result for the reducer callback.
 */
export interface ScanOptions<T, R> {
  /**
   * The optional seed used for the scan operation.
   *
   * @type {R} The type of the result
   * @memberof ScanOptions
   */
  seed?: R;
  /**
   * The callback used for the scan operation, which passes the accumulator, current value, the
   * current index, and an Abort Signal.  This returns a result or a Promise containing a result.
   *
   * @memberof ScanOptions
   */
  callback: (accumulator: R, current: T, index: number, signal?: AbortSignal) => R | Promise<R>;
}
