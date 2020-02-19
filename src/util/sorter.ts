/**
 * @ignore
 */
export function sorter<TElement>(fst: TElement, snd: TElement): number {
  // eslint-disable-next-line no-nested-ternary
  return fst > snd ? 1 : fst < snd ? -1 : 0;
}
