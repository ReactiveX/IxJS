'use strict';

import  * as test  from 'tape';
import { range } from '../../dist/cjs/asynciterable/range';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { _throw } from '../../dist/cjs/asynciterable/throw';

test('AsyncItearble#tap next', async t => {
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

test('AsyncIterable#tap next complete', async t => {
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

test('AsyncIterable#tap with error', async t => {
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

test('AsyncItearble#tap with observer class', async t => {
  const obs = new MyObserver();
  const source = tap(range(0, 10), obs);

  // tslint:disable-next-line:no-empty
  for await (let _ of source) { }

  t.true(obs.done);
  t.equal(45, obs.sum);
  t.end();
});