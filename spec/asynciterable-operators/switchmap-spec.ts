import '../asynciterablehelpers';
import { of, toArray } from 'ix/asynciterable';
import { switchMap, delayEach, tap } from 'ix/asynciterable/operators';

describe(`AsyncIterable#switchMap`, () => {
  test('switches inner sequences', async () => {
    const outerValues = new Array<number>();
    const innerValues = new Array<string>();

    const xs = of(0, 1, 2).pipe(
      delayEach(500),
      tap((x) => outerValues.push(x))
    );
    const ys = of('0', '1', '2', '3').pipe(
      delayEach(200),
      tap((x) => innerValues.push(x))
    );
    const source = xs.pipe(switchMap(() => ys));
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
    expect(outerValues).toEqual([0, 1, 2]);
  });

  test(`supports projecting to Arrays`, async () => {
    const xs = of(0, 1, 2).pipe(delayEach(100));
    const source = xs.pipe(switchMap(() => [0, 1, 2]));
    expect(await toArray(source)).toEqual([0, 1, 2, 0, 1, 2, 0, 1, 2]);
  });

  test(`supports projecting to Promise<Array>`, async () => {
    const xs = of(0, 1, 2).pipe(delayEach(100));
    const source = xs.pipe(switchMap(async () => [0, 1, 2]));
    expect(await toArray(source)).toEqual([0, 1, 2, 0, 1, 2, 0, 1, 2]);
  });
});
