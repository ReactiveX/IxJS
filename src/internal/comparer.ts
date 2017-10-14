'use strict';
/**
 * @ignore
 */
export function comparer(a: any, b: any) {
  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
}

/**
 * @ignore
 */
export async function comparerAsync(a: any, b: any) {
  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
}
