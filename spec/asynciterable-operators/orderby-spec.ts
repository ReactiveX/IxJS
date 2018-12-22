import * as Ix from '../Ix';
import { hasNext, noNext, testOperator } from '../asynciterablehelpers';
const { of } = Ix.AsyncIterable;
const { orderBy, orderByDescending, thenBy, thenByDescending } = Ix.asynciterable;
const testOrderBy = testOperator([orderBy]);
const testOrderByDescending = testOperator([orderByDescending]);
const testOrderByThenBy = testOperator([orderBy, thenBy] as [typeof orderBy, typeof thenBy]);
//tslint:disable-next-line
const testOrderByDescendingThenByDescending = testOperator([
  orderByDescending,
  thenByDescending
] as [typeof orderByDescending, typeof thenByDescending]);

testOrderBy('AsyncIterable#orderBy normal ordering', async ([orderBy]) => {
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = orderBy(xs, x => x);

  const it = ys[Symbol.asyncIterator]();
  for (let i = 0; i < 10; i++) {
    await hasNext(it, i);
  }

  await noNext(it);
});

testOrderByThenBy(
  'AsyncIterable#orderBy normal ordering with thenBy throws',
  async ([orderBy, thenBy]) => {
    const err = new Error();
    const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
    const ys = thenBy(orderBy(xs, x => x), () => {
      throw err;
    });

    const it = ys[Symbol.asyncIterator]();
    try {
      await it.next();
    } catch (e) {
      expect(err).toEqual(e);
    }
  }
);

testOrderBy('AsyncIterable#orderBy selector throws', async ([orderBy]) => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = orderBy(xs, () => {
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

//tslint:disable-next-line
testOrderByDescending(
  'AsyncIterable#orderByDescending normal ordering',
  async ([orderByDescending]) => {
    const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
    const ys = orderByDescending(xs, x => x);

    const it = ys[Symbol.asyncIterator]();
    for (let i = 9; i >= 0; i--) {
      await hasNext(it, i);
    }

    await noNext(it);
  }
);

//tslint:disable-next-line
testOrderByDescendingThenByDescending(
  'AsyncIterable#orderByDescending normal ordering with thenByDescending throws',
  async ([orderByDescending, thenByDescending]) => {
    const err = new Error();
    const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
    const ys = thenByDescending(orderByDescending(xs, x => x), () => {
      throw err;
    });

    const it = ys[Symbol.asyncIterator]();
    try {
      await it.next();
    } catch (e) {
      expect(err).toEqual(e);
    }
  }
);
