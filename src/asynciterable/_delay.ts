import { AbortError } from '../util/aborterror';

export function delay(action: () => void, dueTime: number, signal?: AbortSignal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      throw new AbortError();
    }

    const id = setTimeout(() => {
      if (signal?.aborted) {
        throw new AbortError();
      }

      try {
        action();
        resolve();
      } catch (e) {
        reject(e);
      }
    }, dueTime);

    if (signal) {
      signal.onabort = () => {
        clearTimeout(id);
        reject(new AbortError());
      };
    }
  });
}
