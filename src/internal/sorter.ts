/**
 * @ignore
 */
export function sorter<TElement>(fst: TElement, snd: TElement): number {
  return fst > snd ? 1 : fst < snd ? -1 : 0;
}
