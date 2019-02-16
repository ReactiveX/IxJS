import { empty, range, sequenceEqual } from 'ix/asynciterable';
import { skip, takeLast } from 'ix/asynciterable/operators';

test('AsyncIterable#takeLast none', async () => {
  const res = range(1, 5).pipe(takeLast(0));
  expect(await sequenceEqual(res, empty<number>())).toBeTruthy();
});

test('AsyncIterable#takeLast empty', async () => {
  const res = empty<number>().pipe(takeLast(1));
  expect(await sequenceEqual(res, empty<number>())).toBeTruthy();
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
