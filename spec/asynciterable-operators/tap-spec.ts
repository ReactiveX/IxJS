import '../asynciterablehelpers';
import { range, throwError } from 'ix/asynciterable';
import { tap } from 'ix/asynciterable/operators';

test('AsyncItearble#tap next', async () => {
  let n = 0;
  const source = range(0, 10).pipe(
    tap({
      next: async (x) => {
        n += x;
      },
    })
  );

  // eslint-disable-next-line no-empty
  for await (const _ of source) {
  }

  expect(45).toBe(n);
});

test('AsyncIterable#tap next complete', async () => {
  let n = 0;
  const source = range(0, 10).pipe(
    tap({
      next: async (x) => {
        n += x;
      },
      complete: async () => {
        n *= 2;
      },
    })
  );

  // eslint-disable-next-line no-empty
  for await (const _ of source) {
  }

  expect(90).toBe(n);
});

test('AsyncIterable#tap with error', async () => {
  const err = new Error();
  let ok = false;

  const source = throwError(err).pipe(
    tap({
      error: async (e) => {
        expect(e).toEqual(err);
        ok = true;
      },
    })
  );

  // eslint-disable-next-line no-empty
  await expect(
    (async () => {
      for await (const _ of source);
    })()
  ).rejects.toThrow(err);

  expect(ok).toBeTruthy();
});

test('AsyncItearble#tap with next function', async () => {
  let n = 0;
  const source = range(0, 10).pipe(tap(async (x) => (n += x)));

  // eslint-disable-next-line no-empty
  for await (const _ of source) {
  }

  expect(45).toBe(n);
});

class MyObserver {
  public sum = 0;
  public done = false;

  async next(value: number) {
    this.sum += value;
  }

  async complete() {
    this.done = true;
  }
}

test('AsyncItearble#tap with observer class', async () => {
  const obs = new MyObserver();
  const source = range(0, 10).pipe(tap(obs));

  // eslint-disable-next-line no-empty
  for await (const _ of source) {
  }

  expect(obs.done).toBeTruthy();
  expect(45).toBe(obs.sum);
});
