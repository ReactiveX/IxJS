import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.partition]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

function isEven(x: number) {
  return x % 2 === 0;
}

test('Iterable#partition both empty', (t, [partition]) => {
  const xs = empty<number>();
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has left', (t, [partition]) => {
  const xs = of(4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(t, fstIt, 4);
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has right', (t, [partition]) => {
  const xs = of(3);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(t, sndIt, 3);
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has both', (t, [partition]) => {
  const xs = of(1, 2, 3, 4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(t, fstIt, 2);
  hasNext(t, fstIt, 4);
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(t, sndIt, 1);
  hasNext(t, sndIt, 3);
  noNext(t, sndIt);
  t.end();
});
