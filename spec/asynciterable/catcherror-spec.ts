import { hasNext } from '../asynciterablehelpers';
import { catchError, concat, range, sequenceEqual, throwError } from 'ix/asynciterable';

test('AsyncIterable#catch with no errors', async () => {
  const res = catchError(range(0, 5), range(5, 5));
  expect(await sequenceEqual(res, range(0, 5))).toBeTruthy();
});

test('AsyncIterable#catch with concat error', async () => {
  const res = catchError(concat(range(0, 5), throwError(new Error())), range(5, 5));

  expect(await sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('AsyncIterable#catch still throws', async () => {
  const e1 = new Error();
  const er1 = throwError(e1);

  const e2 = new Error();
  const er2 = throwError(e2);

  const e3 = new Error();
  const er3 = throwError(e3);

  const res = catchError(concat(range(0, 2), er1), concat(range(2, 2), er2), er3);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await expect(it.next()).rejects.toThrow();
});
