# Buffer - count or time

An operator that's useful when you need to handle messages in batches.
Let's say you have an ongoing subscription to something but want to handle batches of messages.

```ts
await subscription.pipe(
  // emit when buffer hits 16 items, or every 100ms
  bufferCountOrTime(16, 100)
)
.forEach(handleBatch)
```

Using this operator makes sure that if messages slow down you'll still 
handle them in a reasonable time whereas using `buffer` would leave you stuck until you get
the right amount of messages.
