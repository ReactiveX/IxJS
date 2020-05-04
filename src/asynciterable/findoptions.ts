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
 * A find options property bag with the selector, thisArg for binding and AbortSignal are all optional.
 *
 * @export
 * @interface OptionalFindSubclassedOptions
 * @template T The type of the elements in the source sequence.
 * @template S The type of the return from the predicate which is truthy or falsy.
 */
export interface OptionalFindSubclassedOptions<T, S extends T> {
  /**
   * The optional abort signal to be used for cancelling the sequence at any time.
   *
   * @type {AbortSignal}
   * @memberof OptionalFindSubclassedOptions
   */
  signal?: AbortSignal;
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof OptionalFindSubclassedOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value, the current index and abort signal. This function
   * returns either a truthy value  or a promise containing a truthy value whether the condition holds or not.
   *
   * @memberof OptionalFindSubclassedOptions
   */
  predicate?: (value: T, index: number, signal?: AbortSignal) => value is S;
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

/**
 * A find options property bag with the selector being required and the thisArg for binding and AbortSignal are all optional.
 *
 * @export
 * @interface FindSubclassedOptions
 * @template T The type of the elements in the source sequence.
 * @template S The type of the return from the predicate which is truthy or falsy.
 */
export interface FindSubclassedOptions<T, S extends T> {
  /**
   *  The optional abort signal to be used for cancelling the sequence at any time.
   *
   * @type {AbortSignal}
   * @memberof FindSubclassedOptions
   */
  signal?: AbortSignal;
  /**
   * The optional `this` binding for the predicate function.
   *
   * @type {*}
   * @memberof FindSubclassedOptions
   */
  thisArg?: any;
  /**
   * The optional predicate which gives the current value, the current index and abort signal. This function
   * returns either a truthy value  or a promise containing a truthy value whether the condition holds or not.
   *
   * @memberof FindSubclassedOptions
   */
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S;
}
