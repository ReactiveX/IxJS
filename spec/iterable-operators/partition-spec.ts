import { empty, of, partition } from 'ix/iterable';
import { hasNext, noNext } from '../iterablehelpers';

function isEven(x: number) {
  return x % 2 === 0;
}

test('Iterable#partition both empty', () => {
  const xs = empty<number>();
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(sndIt);
});

test('Iterable#partition has left', () => {
  const xs = of(4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(fstIt, 4);
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(sndIt);
});

test('Iterable#partition has right', () => {
  const xs = of(3);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(sndIt, 3);
  noNext(sndIt);
});

test('Iterable#partition has both', () => {
  const xs = of(1, 2, 3, 4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(fstIt, 2);
  hasNext(fstIt, 4);
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(sndIt, 1);
  hasNext(sndIt, 3);
  noNext(sndIt);
});
