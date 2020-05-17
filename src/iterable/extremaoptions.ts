export interface ExtremaOptions<TSource, TKey = TSource> {
  comparer?: (left: TKey, right: TKey) => number;
  selector: (item: TSource) => TKey;
  signal?: AbortSignal;
}
