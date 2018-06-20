import {
  from,
  interval,
  timer,
  fromEvent,
  of
} from "rxjs"
import { Subscriber } from "rxjs"
import {
  take,
  switchMap,
  mapTo,
  mergeMap,
  tap,
  scan,
  delay
} from "rxjs/operators"

class MergeMapSubscriber extends Subscriber {
  innerSubscription

  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    if (this.innerSubscription) {
      this.innerSubscription.unsubscribe()
    }
    console.log(`🐭`, value)
    const o$ = this.fn(value)

    this.innerSubscription = o$.subscribe({
      next: value => {
        this.destination.next(value)
      },
      complete: () => {
        console.log(`  ⏱`, "done")
      }
    })
  }
}

const myMergeMap = fn => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(
        new MergeMapSubscriber(sub, fn)
      )
    }
  })

const observable$ = fromEvent(document, "click")

const subscriber = {
  next: value => {
    console.log(`  ⏱`, value)
  },
  complete: () => {
    console.log("destination done")
  },
  error: value => {
    console.log(value)
  }
}

observable$
  .pipe(
    scan(i => i + 1, 0),
    myMergeMap(i => of(i).pipe(delay(500)))
  )
  .subscribe(subscriber)
