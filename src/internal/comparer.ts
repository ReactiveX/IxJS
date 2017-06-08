'use strict';
/**
 * @ignore
 */
export function comparer(a: any, b: any) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}

/**
 * @ignore
 */
export async function comparerAsync(a: any, b: any) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}