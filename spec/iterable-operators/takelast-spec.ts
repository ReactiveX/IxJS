import '../iterablehelpers';
import { range, sequenceEqual } from 'ix/iterable';
import { skip, takeLast } from 'ix/iterable/operators';

test('Iterable#takeLast none', () => {
  const res = range(1, 5).pipe(takeLast(0));
  expect(sequenceEqual(res, [])).toBeTruthy();
});

test('Iterable#takeLast empty', () => {
  const res = takeLast(1)([]);
  expect(sequenceEqual(res, [])).toBeTruthy();
});

test('Iterable#takeLast has all', () => {
  const e = range(0, 5);
  const r = e.pipe(takeLast(5));
  expect(sequenceEqual(r, e)).toBeTruthy();
});

test('Iterable#takeLast has part', () => {
  const e = range(0, 5);
  const r = e.pipe(takeLast(3));
  expect(sequenceEqual(r, e.pipe(skip(2)))).toBeTruthy();
});
