/**
 * A find options property bag with the selector and thisArg for binding all optional.
 *
 * @export
 * @interface OptionalFindOptions
 * @template T The type of the elements in the source sequence.
 */
export interface OptionalFindOptions<T> {
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof OptionalFindOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value and the current index. This function
   * returns either a boolean or a promise containing a boolean whether the condition holds or not.
   *
   * @memberof OptionalFindOptions
   */
  predicate?: (value: T, index: number) => boolean;
}

/**
 * A find options property bag with the selector being required and the thisArg for binding are all optional.
 *
 * @export
 * @interface FindOptions
 * @template T The type of the elements in the source sequence.
 */
export interface FindOptions<T> {
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof FindOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value and the current index. This function
   * returns either a truthy value whether the condition holds or not.
   *
   * @memberof FindOptions
   */
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean;
}
