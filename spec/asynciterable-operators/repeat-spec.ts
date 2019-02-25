import { every, of, sum, toArray } from 'ix/asynciterable';
import { buffer, map, repeat, tap, take } from 'ix/asynciterable/operators';

test('AsyncIterable#repeat infinite', async () => {
  let i = 0;
  const xs = repeat(
    tap(of(1, 2), {
      next: async () => {
        ++i;
      }
    })``
  );

  const res = await toArray(xs.pipe(take(10)));
  expect(10).toBe(res.length);
  expect(
    every(
      res.pipe(
        buffer(2),
        map(b => sum(b))
      ),
      x => x === 3
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});

test('AsyncIterable#repeat finite', async () => {
  let i = 0;
  const xs = of(1, 2).pipe(
    tap({
      next: async () => {
        ++i;
      }
    }),
    repeat(5)
  );
  const res = toArray(xs);
  expect(10).toBe(res.length);
  expect(
    every(
      res.pipe(
        buffer(2),
        map(b => sum(b))
      ),
      x => x === 3
    )
  ).toBeTruthy();
  expect(10).toBe(i);
});
