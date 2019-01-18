import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.partition]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

function isEven(x: number) {
  return x % 2 === 0;
}

test('Iterable#partition both empty', ([partition]) => {
  const xs = empty<number>();
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(sndIt);
});

test('Iterable#partition has left', ([partition]) => {
  const xs = of(4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(fstIt, 4);
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(sndIt);
});

test('Iterable#partition has right', ([partition]) => {
  const xs = of(3);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(sndIt, 3);
  noNext(sndIt);
});

test('Iterable#partition has both', ([partition]) => {
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
