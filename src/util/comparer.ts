/**
 * @ignore
 */
export function comparer(x: any, y: any) {
  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
}

/**
 * @ignore
 */
export async function comparerAsync(x: any, y: any) {
  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
}
