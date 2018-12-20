import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.partition]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

function isEven(x: number) {
  return x % 2 === 0;
}

test('AsyncIterable#partition both empty', async ([partition]) => {
  const xs = empty<number>();
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.asyncIterator]();
  await noNext(fstIt);

  const sndIt = snd[Symbol.asyncIterator]();
  await noNext(sndIt);
});

test('AsyncIterable#partition has left', async ([partition]) => {
  const xs = of(4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.asyncIterator]();
  await hasNext(fstIt, 4);
  await noNext(fstIt);

  const sndIt = snd[Symbol.asyncIterator]();
  await noNext(sndIt);
});

test('AsyncIterable#partition has right', async ([partition]) => {
  const xs = of(3);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.asyncIterator]();
  await noNext(fstIt);

  const sndIt = snd[Symbol.asyncIterator]();
  await hasNext(sndIt, 3);
  await noNext(sndIt);
});

test('AsyncIterable#partition has both', async ([partition]) => {
  const xs = of(1, 2, 3, 4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.asyncIterator]();
  await hasNext(fstIt, 2);
  await hasNext(fstIt, 4);
  await noNext(fstIt);

  const sndIt = snd[Symbol.asyncIterator]();
  await hasNext(sndIt, 1);
  await hasNext(sndIt, 3);
  await noNext(sndIt);
});
