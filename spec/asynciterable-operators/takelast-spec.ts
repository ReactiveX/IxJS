import '../asynciterablehelpers.js';
import { empty, range, sequenceEqual } from 'ix/asynciterable/index.js';
import { skip, takeLast } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#takeLast none', async () => {
  const res = range(1, 5).pipe(takeLast(0));
  expect(await sequenceEqual(res, empty())).toBeTruthy();
});

test('AsyncIterable#takeLast empty', async () => {
  const res = empty().pipe(takeLast(1));
  expect(await sequenceEqual(res, empty())).toBeTruthy();
});

test('AsyncIterable#takeLast has all', async () => {
  const e = range(0, 5);
  const r = e.pipe(takeLast(5));
  expect(await sequenceEqual(r, e)).toBeTruthy();
});

test('AsyncIterable#takeLast has part', async () => {
  const e = range(0, 5);
  const r = e.pipe(takeLast(3));
  expect(await sequenceEqual(r, e.pipe(skip(2)))).toBeTruthy();
});
