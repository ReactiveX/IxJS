/**
 * The options for calculating an average.
 *
 * @export
 * @interface MathOptions
 * @template T The type of elements in the source sequence.
 */
export interface MathOptions<T> {
  /**
   * An optional selector used to get the value to average.
   *
   * @memberof MathOptions
   */
  selector?: (x: T) => number;
  /**
   * An optional thisArg for the selector.
   *
   * @type {*}
   * @memberof MathOptions
   */
  thisArg?: any;
}
