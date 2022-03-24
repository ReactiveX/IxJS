import '../asynciterablehelpers';
import { sum } from 'ix/iterable';
import { AsyncIterableX, every, of, toArray } from 'ix/asynciterable';
import { buffer, map, repeat, tap, take } from 'ix/asynciterable/operators';

test('AsyncIterable#repeat infinite', async () => {
  let i = 0;
  const xs = of(1, 2)
    .pipe(
      tap(async () => {
        ++i;
      })
    )
    .pipe(repeat());

  const res = await toArray(xs.pipe(take(10)));

  expect(10).toBe(res.length);
  expect(
    every(
      AsyncIterableX.from(res).pipe(
        buffer(2),
        map((b) => sum(b))
      ),
      { predicate: (x) => x === 3 }
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});

test('AsyncIterable#repeat finite', async () => {
  let i = 0;
  const xs = of(1, 2).pipe(
    tap(async () => {
      ++i;
    }),
    repeat(5)
  );
  const res = await toArray(xs);
  expect(10).toBe(res.length);
  expect(
    every(
      AsyncIterableX.from(res).pipe(
        buffer(2),
        map((b) => sum(b))
      ),
      { predicate: (x) => x === 3 }
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});
