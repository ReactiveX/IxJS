import '../iterablehelpers';
import { from, every, sum, toArray } from 'ix/iterable';
import { buffer, map, take, tap, repeat } from 'ix/iterable/operators';

test('Iterable#repeat infinite', () => {
  let i = 0;
  const xs = from([1, 2])
    .pipe(tap({ next: () => ++i }))
    .pipe(repeat());

  const res = xs.pipe(take(10)).pipe(toArray);
  expect(10).toBe(res.length);
  expect(
    every(
      from(res)
        .pipe(buffer(2))
        .pipe(map(b => sum(b))),
      x => x === 3
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});

test('Iterable#repeat finite', () => {
  let i = 0;
  const xs = from([1, 2])
    .pipe(tap({ next: () => ++i }))
    .pipe(repeat(5));

  const res = xs.pipe(take(10)).pipe(toArray);
  expect(10).toBe(res.length);
  expect(
    every(
      from(res)
        .pipe(buffer(2))
        .pipe(map(b => sum(b))),
      x => x === 3
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});
