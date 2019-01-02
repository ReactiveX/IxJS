import '../asynciterablehelpers';
import { Iterable, AsyncIterable, IterableReadable } from '../Ix';

(() => {
  if (!IterableReadable || process.env.TEST_NODE_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_NODE_STREAMS !== "true"', () => {
      /**/
    });
  }

  const objectsItr = () => stringsItr().map(val => ({ val }));
  const buffersItr = () => stringsItr().map(val => Buffer.from(val));
  const stringsItr = () => Iterable.from([1, 2, 3]).map(i => `${i}`);
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

  describe(`Iterable#toNodeStream`, () => {
    describe(`objectMode: true`, () => {
      const expectedStrings = ['1', '2', '3'];
      const expectedObjects = expectedStrings.map(val => ({ val }));
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        await expect(stringsItr().toNodeStream({ objectMode: true })).toEqualStream(
          AsyncIterable.from(expectedStrings),
          compare
        );
      });
      test(`yields Buffers`, async () => {
        await expect(buffersItr().toNodeStream({ objectMode: true })).toEqualStream(
          AsyncIterable.from(expectedBuffers),
          compare
        );
      });
      test(`yields Objects`, async () => {
        await expect(objectsItr().toNodeStream({ objectMode: true })).toEqualStream(
          AsyncIterable.from(expectedObjects),
          compare
        );
      });
    });

    describe(`objectMode: false`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        await expect(stringsItr().toNodeStream({ objectMode: false })).toEqualStream(
          AsyncIterable.from(expectedStrings),
          compare
        );
      });
      test(`yields Buffers`, async () => {
        await expect(buffersItr().toNodeStream({ objectMode: false })).toEqualStream(
          AsyncIterable.from(expectedBuffers),
          compare
        );
      });
    });
  });
})();
