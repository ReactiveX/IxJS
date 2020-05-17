export interface ExtremaOptions<TSource, TKey> {
  selector?: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  comparer?: (left: TKey, right: TKey) => number | Promise<number>;
  signal?: AbortSignal;
}
