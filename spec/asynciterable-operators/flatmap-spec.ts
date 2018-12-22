import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.flatMap]);
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#flatMap with range', async ([flatMap]) => {
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => range(0, x));

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#flatMap selector returns throw', async ([flatMap]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => (x < 3 ? range(0, x) : _throw(err)));

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('Iterable#flatMap with error throws', async ([flatMap]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('Iterable#flatMap selector throws error', async ([flatMap]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => {
    if (x < 3) {
      return range(0, x);
    }
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
