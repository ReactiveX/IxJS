import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.batch]);

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

test('AsyncIterable#batch basic', async (t, [batch]) => {
  const sink = new Ix.AsyncSink<number>();

  const it = batch(sink)[Symbol.asyncIterator]();

  sink.write(1);
  sink.write(2);

  await delay();
  t.deepEqual(await it.next(), { done: false, value: [1, 2] });

  setTimeout(() => sink.write(3), 50);

  t.deepEqual(await it.next(), { done: false, value: [3] });

  sink.write(4);
  sink.write(5);
  sink.end();

  await delay();
  t.deepEqual(await it.next(), {
    done: false,
    value: [4, 5]
  });
  t.deepEqual(await it.next(), {
    done: true
  });

  t.end();
});

test('done while waiting', async (t, [batch]) => {
  const sink = new Ix.AsyncSink<number>();

  const it = batch(sink)[Symbol.asyncIterator]();

  sink.write(1);
  sink.write(2);

  await delay();
  t.deepEqual(await it.next(), { done: false, value: [1, 2] });

  setTimeout(() => sink.end(), 50);

  t.deepEqual(await it.next(), { done: true });

  t.end();
});

test('canceled', async (t, [batch]) => {
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
  t.deepEqual(await it.next(), { done: false, value: [0] });

  t.deepEqual(await it.return!(), { done: true });
  t.true(canceled);

  t.end();
});
