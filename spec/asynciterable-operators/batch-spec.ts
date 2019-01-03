import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.batch]);

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

test('AsyncIterable#batch basic', async ([batch]) => {
  const sink = new Ix.AsyncSink<number>();

  const it = batch(sink)[Symbol.asyncIterator]();

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
    value: [4, 5]
  });
  expect(await it.next()).toEqual({
    done: true
  });
});

test('done while waiting', async ([batch]) => {
  const sink = new Ix.AsyncSink<number>();

  const it = batch(sink)[Symbol.asyncIterator]();

  sink.write(1);
  sink.write(2);

  await delay();
  expect(await it.next()).toEqual({ done: false, value: [1, 2] });

  setTimeout(() => sink.end(), 50);

  expect(await it.next()).toEqual({ done: true });
});

test('canceled', async ([batch]) => {
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

  const it = batch(generate())[Symbol.asyncIterator]();

  await delay(150);
  expect(await it.next()).toEqual({ done: false, value: [0] });

  expect(await it.return!()).toEqual({ done: true });
  expect(canceled).toBe(true);
});
