import { AsyncObservable, AsyncObserver, AsyncSubscription } from '../interfaces';
import { AsyncSubscriptionX } from './subscriptions/asyncsubscriptionx';

export async function subscribeSafe<T>(
  observable: AsyncObservable<T>,
  observer: AsyncObserver<T>
): Promise<AsyncSubscription> {
  try {
    return await observable.subscribeAsync(observer);
  } catch (e) {
    await observer.error(e);
    return AsyncSubscriptionX.empty();
  }
}
