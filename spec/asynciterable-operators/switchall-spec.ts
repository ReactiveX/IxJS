import '../asynciterablehelpers';
import { of, toArray } from 'ix/asynciterable';
import { switchAll, delayEach, tap } from 'ix/asynciterable/operators';

describe(`AsyncIterable#switchAll`, () => {
  test('switches inner sequences', async () => {
    const innerValues = new Array<string>();

    const ys = of('0', '1', '2', '3').pipe(
      delayEach(200),
      tap((x) => innerValues.push(x))
    );
    const xs = of(ys, ys, ys).pipe(delayEach(500));
    const source = xs.pipe(switchAll());
    const expected = [
      '0',
      '1', // xs=0
      '0',
      '1', // xs=1
      '0',
      '1',
      '2',
      '3', // xs=2
    ];

    expect(await toArray(source)).toEqual(expected);

    expect(innerValues).toEqual(expected);
  });

  test(`supports projecting to Arrays`, async () => {
    const xs = of([0, 1, 2], [0, 1, 2], [0, 1, 2]).pipe(delayEach(100));
    const source = xs.pipe(switchAll());
    expect(await toArray(source)).toEqual([0, 1, 2, 0, 1, 2, 0, 1, 2]);
  });

  test(`supports projecting to Promise<Array>`, async () => {
    const xs = of(
      Promise.resolve([0, 1, 2]),
      Promise.resolve([0, 1, 2]),
      Promise.resolve([0, 1, 2])
    ).pipe(delayEach(100));
    const source = xs.pipe(switchAll());
    expect(await toArray(source)).toEqual([0, 1, 2, 0, 1, 2, 0, 1, 2]);
  });
});
