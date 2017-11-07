export interface AsyncSubscription {
  unsubscribe: () => Promise<void>;
}
