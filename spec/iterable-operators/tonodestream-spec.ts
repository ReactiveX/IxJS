import '../asynciterablehelpers';
import { from as fromIterable } from 'ix/iterable';
import { from as fromAsyncIterable } from 'ix/asynciterable';
import { map, toNodeStream } from 'ix/iterable/operators/index.node';
import { IterableReadable } from 'ix/Ix.node';

(() => {
  if (!IterableReadable || process.env.TEST_NODE_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_NODE_STREAMS !== "true"', () => {
      /**/
    });
  }

  const stringsItr = () => fromIterable([1, 2, 3]).pipe(map(i => `${i}`));
  const buffersItr = () => stringsItr().pipe(map(val => Buffer.from(val)));
  const objectsItr = () => stringsItr().pipe(map(val => ({ val })));
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
        await expect(stringsItr().pipe(toNodeStream({ objectMode: true }))).toEqualStream(
          fromAsyncIterable(expectedStrings),
          compare
        );
      });
      test(`yields Buffers`, async () => {
        await expect(buffersItr().pipe(toNodeStream({ objectMode: true }))).toEqualStream(
          fromAsyncIterable(expectedBuffers),
          compare
        );
      });
      test(`yields Objects`, async () => {
        await expect(objectsItr().pipe(toNodeStream({ objectMode: true }))).toEqualStream(
          fromAsyncIterable(expectedObjects),
          compare
        );
      });
    });

    describe(`objectMode: false`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        await expect(stringsItr().pipe(toNodeStream({ objectMode: false }))).toEqualStream(
          fromAsyncIterable(expectedStrings),
          compare
        );
      });
      test(`yields Buffers`, async () => {
        await expect(buffersItr().pipe(toNodeStream({ objectMode: false }))).toEqualStream(
          fromAsyncIterable(expectedBuffers),
          compare
        );
      });
    });
  });
})();
