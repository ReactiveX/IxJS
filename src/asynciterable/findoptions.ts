/**
 * A find options property bag with the selector, thisArg for binding and AbortSignal are all optional.
 *
 * @export
 * @interface OptionalFindOptions
 * @template T The type of the elements in the source sequence.
 */
export interface OptionalFindOptions<T> {
  /**
   * The optional abort signal to be used for cancelling the sequence at any time.
   *
   * @type {AbortSignal}
   * @memberof OptionalFindOptions
   */
  signal?: AbortSignal;
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof OptionalFindOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value, the current index and abort signal. This function
   * returns either a boolean or a promise containing a boolean whether the condition holds or not.
   *
   * @memberof OptionalFindOptions
   */
  predicate?: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>;
}

/**
 * A find options property bag with the selector being required and the thisArg for binding and AbortSignal are all optional.
 *
 * @export
 * @interface FindOptions
 * @template T The type of the elements in the source sequence.
 */
export interface FindOptions<T> {
  /**
   *  The optional abort signal to be used for cancelling the sequence at any time.
   *
   * @type {AbortSignal}
   * @memberof FindOptions
   */
  signal?: AbortSignal;
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof FindOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value, the current index and abort signal. This function
   * returns either a truthy value  or a promise containing a truthy value whether the condition holds or not.
   *
   * @memberof FindOptions
   */
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>;
}
