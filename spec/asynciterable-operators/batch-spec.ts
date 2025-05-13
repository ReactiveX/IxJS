import '../asynciterablehelpers.js';
import { batch } from 'ix/asynciterable/operators/index.js';
import { AsyncSink } from 'ix/asynciterable/index.js';

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

test('AsyncIterable#batch basic', async () => {
  const sink = new AsyncSink<number>();

  const it = batch()(sink)[Symbol.asyncIterator]();

  sink.write(1);
  sink.write(2);

  await delay();
  expect(await it.next()).toEqual({ done: false, value: [1, 2] });

  setTimeout(() => sink.write(3), 50);

  expect(await it.next()).toEqual({ done: false, value: [3] });

  sink.write(4);
  sink.write(5);
  sink.end();

  await delay();
  expect(await it.next()).toEqual({
    done: false,
    value: [4, 5],
  });
  expect(await it.next()).toEqual({
    done: true,
  });
});

test('done while waiting', async () => {
  const sink = new AsyncSink<number>();

  const it = batch()(sink)[Symbol.asyncIterator]();

  sink.write(1);
  sink.write(2);

  await delay();
  expect(await it.next()).toEqual({ done: false, value: [1, 2] });

  setTimeout(() => sink.end(), 50);

  expect(await it.next()).toEqual({ done: true });
});

// eslint-disable-next-line jest/no-disabled-tests -- See https://github.com/ReactiveX/IxJS/pull/379#issuecomment-2611883590
test.skip('canceled', async () => {
  let canceled = false;

  async function* generate() {
    try {
      for (let i = 0; ; i++) {
        await delay(100);
        yield i;
      }
    } finally {
      canceled = true;
    }
  }

  const it = batch()(generate())[Symbol.asyncIterator]();

  await delay(150);
  expect(await it.next()).toEqual({ done: false, value: [0] });

  expect(await it.return!()).toEqual({ done: true });
  expect(canceled).toBe(true);
});
