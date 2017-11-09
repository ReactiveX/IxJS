import { AsyncObservable } from './asyncobservable';
import { AsyncObserver } from './asyncobserver';
import { AsyncSubscription } from './asyncsubscription';
import { AsyncSubscriptionX } from './subscriptions/asyncsubscriptionx';

export async function subscribeSafe<T>(
  observable: AsyncObservable<T>,
  observer: AsyncObserver<T>
): Promise<AsyncSubscription> {
  try {
    return await observable.subscribe(observer);
  } catch (e) {
    await observer.error(e);
    return AsyncSubscriptionX.empty();
  }
}
