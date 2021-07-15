/**
 * The options for calculating an average.
 *
 * @interface MathOptions
 * @template T The type of elements in the source sequence.
 */
export interface MathOptions<T> {
  /**
   * An optional selector used to get the value to average.
   *
   * @memberof MathOptions
   */
  selector?: (x: T, signal?: AbortSignal) => number | Promise<number>;
  /**
   * An optional thisArg for the selector.
   *
   * @type {*}
   * @memberof MathOptions
   */
  thisArg?: any;
  /**
   * An optional abort signal to cancel the operation at any time.
   *
   * @type {AbortSignal}
   * @memberof MathOptions
   */
  signal?: AbortSignal;
}
