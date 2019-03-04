import '../asynciterablehelpers';
import { Readable, ReadableOptions } from 'stream';
import { fromDOMStream, AsyncIterable } from '../Ix';

(() => {
  if (!fromDOMStream || process.env.TEST_DOM_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_DOM_STREAMS !== "true"', () => {
      /**/
    });
  }

  /* tslint:disable */
  const { toStream } = require('web-stream-tools').default;

  class Counter extends Readable {
    private _index: number;
    private _max: number;

    constructor(options?: ReadableOptions) {
      super(options);
      this._max = 3;
      this._index = 0;
    }

    _read() {
      this.push(++this._index > this._max ? null : `${this._index}`);
    }
  }

  const compare = <T>(a: T, b: T) => {
    let aVal = ArrayBuffer.isView(a) ? `${Buffer.from(a.buffer, a.byteOffset, a.byteLength)}` : a;
    let bVal = ArrayBuffer.isView(b) ? `${Buffer.from(b.buffer, b.byteOffset, b.byteLength)}` : b;
    // poor man's deep-equals
    try {
      expect(aVal).toEqual(bVal);
    } catch (e) {
      return false;
    }
    return true;
  };

  describe(`AsyncIterable#fromDOMStream`, () => {
    test('objectMode: true', async () => {
      const c = toStream(new Counter({ objectMode: true }));
      const xs = fromDOMStream(c) as AsyncIterable<string>;
      const expected = AsyncIterable.from(['1', '2', '3']);
      await expect(xs).toEqualStream(expected, compare);
    });

    test('objectMode: false', async () => {
      const c = toStream(new Counter({ objectMode: false }));
      const xs = fromDOMStream(c) as AsyncIterable<Buffer>;
      const expected = AsyncIterable.from(['1', '2', '3'].map(s => Buffer.from(s)));
      await expect(xs).toEqualStream(expected, compare);
    });
  });
})();
