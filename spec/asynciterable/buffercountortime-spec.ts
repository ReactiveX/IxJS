import '../asynciterablehelpers';
import { of, concat } from 'ix/asynciterable';
import { bufferCountOrTime, delay } from 'ix/asynciterable/operators';

test('buffer count behaviour', async () => {
  const result: number[][] = [];

  await of(1, 2, 3, 4, 5, 6, 7, 8, 9, 0)
    .pipe(bufferCountOrTime(5, 10))
    .forEach((buf) => {
      result.push(buf);
    });

  expect(result).toEqual([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0],
  ]);
});

test('buffer time behaviour', async () => {
  const result: number[][] = [];
  const seq = concat(of(1, 2, 3, 4, 5), of(6, 7, 8, 9), of(0).pipe(delay(11)));
  await seq.pipe(bufferCountOrTime(5, 10)).forEach((buf) => {
    result.push(buf);
  });

  expect(result).toEqual([[1, 2, 3, 4, 5], [6, 7, 8, 9], [0]]);
});
