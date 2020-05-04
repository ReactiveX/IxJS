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

/**
 * @ignore
 */
export function equalityComparer<T>(key: T, minValue: T): number {
  // eslint-disable-next-line no-nested-ternary
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}

/**
 * @ignore
 */
export async function equalityComparerAsync<T>(key: T, minValue: T): Promise<number> {
  // eslint-disable-next-line no-nested-ternary
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}
