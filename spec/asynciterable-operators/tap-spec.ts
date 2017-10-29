import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.tap]);
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncItearble#tap next', async (t, [tap]) => {
  let n = 0;
  let source = tap(range(0, 10), {
    next: async x => {
      n += x;
    }
  });

  // tslint:disable-next-line:no-empty
  for await (let _ of source) { }

  t.equal(45, n);
  t.end();
});

test('AsyncIterable#tap next complete', async (t, [tap]) => {
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
  for await (let _ of source) { }

  t.equal(90, n);
  t.end();
});

test('AsyncIterable#tap with error', async (t, [tap]) => {
  let err = new Error();
  let ok = false;

  try {
    const source = tap(_throw<number>(err), {
      error: async e => {
        t.same(err, e);
        ok = true;
      }
    });

    // tslint:disable-next-line:no-empty
    for await (let _ of source) { }
  } catch (e) {
    t.same(err, e);
  }

  t.true(ok);
  t.end();
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

test('AsyncItearble#tap with observer class', async (t, [tap]) => {
  const obs = new MyObserver();
  const source = tap(range(0, 10), obs);

  // tslint:disable-next-line:no-empty
  for await (let _ of source) { }

  t.true(obs.done);
  t.equal(45, obs.sum);
  t.end();
});
