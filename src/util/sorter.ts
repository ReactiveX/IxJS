/**
 * @ignore
 */
export function sorter<TElement>(fst: TElement, snd: TElement): number {
  if (fst > snd) {
    return 1;
  } else if (fst < snd) {
    return -1;
  }

  return 0;
}
