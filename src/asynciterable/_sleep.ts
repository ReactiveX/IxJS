import { AbortError } from 'ix/util/aborterror';

export function sleep(dueTime: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal?.aborted) {
        reject(new AbortError());
      }

      resolve();
    }, dueTime);

    if (signal) {
      signal.onabort = () => {
        clearTimeout(id);
        reject(new AbortError());
      };
    }
  });
}
