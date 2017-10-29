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

testOrderBy('Iterable#orderBy normal ordering', (t, [orderBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 0; i < 10; i++) {
    hasNext(t, it, i);
  }

  noNext(t, it);
  t.end();
});

testOrderByThenBy('Iterable#orderBy normal ordering with thenBy throws', (t, [orderBy, thenBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = thenBy(orderBy(xs, x => x), () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

testOrderBy('Iterable#orderBy selector throws', (t, [orderBy]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

//tslint:disable-next-line
testOrderByDescending('Iterable#orderByDescending normal ordering', (t, [orderByDescending]) => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderByDescending(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 9; i >= 0; i--) {
    hasNext(t, it, i);
  }

  noNext(t, it);
  t.end();
});

//tslint:disable-next-line
testOrderByDescendingThenByDescending(
  'Iterable#orderByDescending normal ordering with thenByDescending throws',
  (t, [orderByDescending, thenByDescending]) => {
    const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
    const ys = thenByDescending(orderByDescending(xs, x => x), () => {
      throw new Error();
    });

    const it = ys[Symbol.iterator]();
    t.throws(() => it.next());
    t.end();
  }
);
