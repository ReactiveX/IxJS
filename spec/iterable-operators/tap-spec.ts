import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.tap]);
const { range } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Itearble#tap next', (t, [tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function (x) {
      n += x;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) { }

  t.equal(45, n);
  t.end();
});

test('Iterable#tap next complete', (t, [tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: function (x) {
      n += x;
    },
    complete: function () {
      n *= 2;
    }
  });

  // tslint:disable-next-line:no-empty
  for (let _ of source) { }

  t.equal(90, n);
  t.end();
});

test('Iterable#tap with error', (t, [tap]) => {
  let err = new Error();
  let ok = false;

  t.throws(() => {
    const source = tap(_throw<number>(err), {
      error: function (e) {
        t.equal(err, e);
        ok = true;
      }
    });

    // tslint:disable-next-line:no-empty
    for (let _ of source) { }
  });

  t.true(ok);
  t.end();
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

test('Itearble#tap with observer class', (t, [tap]) => {
  const obs = new MyObserver();
  const source = tap(range(0, 10), obs);

  // tslint:disable-next-line:no-empty
  for (let _ of source) { }

  t.true(obs.done);
  t.equal(45, obs.sum);
  t.end();
});
