/*
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
*/

// see: https://github.com/nodejs/node/issues/17469#issuecomment-685216777
// see: https://github.com/ReactiveX/IxJS/pull/323

function isPrimitive(value: unknown): boolean {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

// Keys are the values passed to race, values are a record of data containing a
// set of deferreds and whether the value has settled.
const wm = new WeakMap<any, any>();
export function safeRace<T>(contenders: Promise<T>[]): Promise<T> {
  let deferred: any;
  const result = new Promise<T>((resolve, reject) => {
    deferred = { resolve, reject };
    for (const contender of contenders) {
      if (isPrimitive(contender)) {
        // If the contender is a primitive, attempting to use it as a key in the
        // weakmap would throw an error. Luckily, it is safe to call
        // `Promise.resolve(contender).then` on a primitive value multiple times
        // because the promise fulfills immediately.
        Promise.resolve(contender).then(resolve, reject);
        continue;
      }

      let record = wm.get(contender);
      if (record === undefined) {
        record = { deferreds: new Set([deferred]), settled: false };
        wm.set(contender, record);
        // This call to `then` happens once for the lifetime of the value.
        Promise.resolve(contender).then(
          (value) => {
            // eslint-disable-next-line no-shadow
            for (const { resolve } of record.deferreds) {
              resolve(value);
            }

            record.deferreds.clear();
            record.settled = true;
          },
          (err) => {
            // eslint-disable-next-line no-shadow
            for (const { reject } of record.deferreds) {
              reject(err);
            }

            record.deferreds.clear();
            record.settled = true;
          }
        );
      } else if (record.settled) {
        // If the value has settled, it is safe to call
        // `Promise.resolve(contender).then` on it.
        Promise.resolve(contender).then(resolve, reject);
      } else {
        record.deferreds.add(deferred);
      }
    }
  });

  // The finally callback executes when any value settles, preventing any of
  // the unresolved values from retaining a reference to the resolved value.
  return result.finally(() => {
    for (const contender of contenders) {
      if (!isPrimitive(contender)) {
        const record = wm.get(contender);
        record.deferreds.delete(deferred);
      }
    }
  });
}
