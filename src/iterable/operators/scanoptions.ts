export interface ScanOptions<T, R> {
  seed?: R;
  callback: (accumulator: R, current: T, index: number) => R;
}
