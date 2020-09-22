export function createLinkedAbortController(...signals: AbortSignal[]) {
  const controller = new AbortController();

  Array.from(signals).forEach((signal) => {
    signal.onabort = () => {
      controller.abort();
    };
  });

  return controller;
}
