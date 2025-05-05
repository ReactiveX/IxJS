import { AbortError } from '../aborterror.js';

export function sleep(dueTime: number, signal?: AbortSignal, unref = false): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal && signal.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal) {
        signal.removeEventListener('abort', onAbort);
        if (signal.aborted) {
          onAbort();
          return;
        }
      }

      resolve();
    }, dueTime);

    if (unref && typeof id['unref'] === 'function') {
      id['unref']();
    }

    if (signal) {
      signal.addEventListener('abort', onAbort, { once: true });
    }

    function onAbort() {
      clearTimeout(id);
      reject(new AbortError());
    }
  });
}
