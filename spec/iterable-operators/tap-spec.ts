import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.tap]);
const { range } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Itearble#tap next', ([tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function(x) {
      n += x;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) {
  }

  expect(45).toBe(n);
});

test('Iterable#tap next complete', ([tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function(x) {
      n += x;
    },
    complete: function() {
      n *= 2;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) {
  }

  expect(90).toBe(n);
});

test('Iterable#tap with error', ([tap]) => {
  let err = new Error();
  let ok = false;

  expect(() => {
    const source = tap(_throw<number>(err), {
      error: function(e) {
        expect(err).toBe(e);
        ok = true;
      }
    });

    // tslint:disable-next-line:no-empty
    for (let _ of source) {
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

test('Itearble#tap with observer class', ([tap]) => {
  const obs = new MyObserver();
  const source = tap(range(0, 10), obs);

  // tslint:disable-next-line:no-empty
  for (let _ of source) {
  }

  expect(obs.done).toBeTruthy();
  expect(45).toBe(obs.sum);
});
