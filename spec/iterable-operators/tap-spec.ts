import '../iterablehelpers';
import { range, throwError } from 'ix/iterable';
import { tap } from 'ix/iterable/operators';

test('Itearble#tap next', () => {
  let n = 0;
  const source = range(0, 10).pipe(
    tap({
      next: function (x) {
        n += x;
      },
    })
  );

  // eslint-disable-next-line no-empty
  for (const _ of source) {
  }

  expect(45).toBe(n);
});

test('Iterable#tap next complete', () => {
  let n = 0;
  const source = range(0, 10).pipe(
    tap({
      next: function (x) {
        n += x;
      },
      complete: function () {
        n *= 2;
      },
    })
  );

  // eslint-disable-next-line no-empty
  for (const _ of source) {
  }

  expect(90).toBe(n);
});

test('Iterable#tap with error', () => {
  const err = new Error();
  let ok = false;

  expect(() => {
    const source = throwError(err).pipe(
      tap({
        error: function (e) {
          expect(err).toBe(e);
          ok = true;
        },
      })
    );

    // eslint-disable-next-line no-empty
    for (const _ of source) {
    }
  }).toThrow();

  expect(ok).toBeTruthy();
});

class MyObserver {
  public sum: number = 0;
  public done: boolean = false;

  next(value: number) {
    this.sum += value;
  }

  complete() {
    this.done = true;
  }
}

test('Itearble#tap with observer class', () => {
  const obs = new MyObserver();
  const source = range(0, 10).pipe(tap(obs));

  // eslint-disable-next-line no-empty
  for (const _ of source) {
  }

  expect(obs.done).toBeTruthy();
  expect(45).toBe(obs.sum);
});
