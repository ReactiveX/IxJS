import * as Ix from '../Ix';
import { hasNext, noNext, testOperator } from '../iterablehelpers';
const { orderBy, orderByDescending, thenBy, thenByDescending } = Ix.iterable;
const testOrderBy = testOperator([orderBy]);
const testOrderByDescending = testOperator([orderByDescending]);
const testOrderByThenBy = testOperator([orderBy, thenBy] as [typeof orderBy, typeof thenBy]);
//tslint:disable-next-line
const testOrderByDescendingThenByDescending = testOperator([
  orderByDescending,
  thenByDescending
] as [typeof orderByDescending, typeof thenByDescending]);

testOrderBy('Iterable#orderBy normal ordering', ([orderBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 0; i < 10; i++) {
    hasNext(it, i);
  }

  noNext(it);
});

testOrderByThenBy('Iterable#orderBy normal ordering with thenBy throws', ([orderBy, thenBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = thenBy(orderBy(xs, x => x), () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

testOrderBy('Iterable#orderBy selector throws', ([orderBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

//tslint:disable-next-line
testOrderByDescending('Iterable#orderByDescending normal ordering', ([orderByDescending]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderByDescending(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 9; i >= 0; i--) {
    hasNext(it, i);
  }

  noNext(it);
});

//tslint:disable-next-line
testOrderByDescendingThenByDescending(
  'Iterable#orderByDescending normal ordering with thenByDescending throws',
  ([orderByDescending, thenByDescending]) => {
    const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
    const ys = thenByDescending(orderByDescending(xs, x => x), () => {
      throw new Error();
    });

    const it = ys[Symbol.iterator]();
    expect(() => it.next()).toThrow();
  }
);
