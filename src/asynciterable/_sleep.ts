export function sleep(dueTime: number) {
  return new Promise<void>(res => setTimeout(res, dueTime));
}