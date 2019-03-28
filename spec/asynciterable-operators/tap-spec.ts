import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.tap]);
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncItearble#tap next', async ([tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: async x => {
      n += x;
    }
  });

  // tslint:disable-next-line:no-empty
  for await (let _ of source) {
  }

  expect(45).toBe(n);
});

test('AsyncIterable#tap next complete', async ([tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: async x => {
      n += x;
    },
    complete: async () => {
      n *= 2;
    }
  });

  // tslint:disable-next-line:no-empty
  for await (let _ of source) {
  }

  expect(90).toBe(n);
});

test('AsyncIterable#tap with error', async ([tap]) => {
  let err = new Error();
  let ok = false;

  try {
    const source = tap(_throw<number>(err), {
      error: async e => {
        expect(err).toEqual(e);
        ok = true;
      }
    });

    // tslint:disable-next-line:no-empty
    for await (let _ of source) {
    }
  } catch (e) {
    expect(err).toEqual(e);
  }

  expect(ok).toBeTruthy();
});

test('AsyncItearble#tap with next function', async ([tap]) => {
  let n = 0;
  let source = tap(range(0, 10), async x => (n += x));

  // tslint:disable-next-line:no-empty
  for await (let _ of source) {
  }

  expect(45).toBe(n);
});

class MyObserver {
  public sum: number = 0;
  public done: boolean = false;

  async next(value: number) {
    this.sum += value;
  }

  async complete() {
    this.done = true;
  }
}

test('AsyncItearble#tap with observer class', async ([tap]) => {
  const obs = new MyObserver();
  const source = tap(range(0, 10), obs);

  // tslint:disable-next-line:no-empty
  for await (let _ of source) {
  }

  expect(obs.done).toBeTruthy();
  expect(45).toBe(obs.sum);
});
