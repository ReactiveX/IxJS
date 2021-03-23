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
