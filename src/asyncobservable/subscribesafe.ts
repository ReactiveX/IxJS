import { AsyncObservable, AsyncObserver, AsyncSubscription } from '../interfaces';
import { AsyncSubscriptionX } from './subscriptions/asyncsubscriptionx';

export async function subscribeSafe<T>(
  observable: AsyncObservable<T>,
  observer: AsyncObserver<T>,
  signal?: AbortSignal
): Promise<AsyncSubscription> {
  try {
    return await observable.subscribeAsync(observer, signal);
  } catch (e) {
    await observer.error(e);
    return AsyncSubscriptionX.empty();
  }
}
