import { fromNodeStream } from '../Ix';
import { Readable, ReadableOptions } from 'stream';

(() => {
  if (!fromNodeStream || process.env.TEST_NODE_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_NODE_STREAMS !== "true"', () => {
      /**/
    });
  }

  class Counter extends Readable {
    private _index: number;
    private _max: number;

    constructor(options?: ReadableOptions) {
      super(options);
      this._max = 3;
      this._index = 0;
    }

    _read() {
      const i = ++this._index;
      if (i > this._max) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${i}`, 'utf8');
        this.push(buf);
      }
    }
  }

  test('AsyncIterable#fromNodeStream with readable', async () => {
    const c = new Counter({ objectMode: true });
    const xs = fromNodeStream(c);

    const it = xs[Symbol.asyncIterator]();
    let next = await it.next();
    expect(next.done).toBeFalsy();
    expect((next.value as Buffer).compare(Buffer.from('1', 'utf8'))).toBe(0);

    next = await it.next();
    expect(next.done).toBeFalsy();
    expect((next.value as Buffer).compare(Buffer.from('2', 'utf8'))).toBe(0);

    next = await it.next();
    expect(next.done).toBeFalsy();
    expect((next.value as Buffer).compare(Buffer.from('3', 'utf8'))).toBe(0);

    next = await it.next();
    expect(next.done).toBeTruthy();
  });
})();
