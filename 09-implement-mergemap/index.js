import { fromEvent, of, Subscriber } from "rxjs"
import {
  scan,
  delay,
  mergeMap
} from "rxjs/operators"

class MyMergeMapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    console.log(`outer`, value)
    const o$ = this.fn(value)

    o$.subscribe({
      next: value => {
        console.log(`  inner`, value)
        this.destination.next(value)
      }
    })
  }
}

const myMergeMap = fn => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(
        new MyMergeMapSubscriber(sub, fn)
      )
    }
  })

const observable$ = fromEvent(
  document,
  "click"
).pipe(
  scan(i => i + 1, 0),
  myMergeMap(value => of(value).pipe(delay(500)))
)

const subscriber = {
  next: value => {
    console.log(value)
  },
  complete: () => {
    console.log("done")
  },
  error: value => {
    console.log(value)
  }
}

observable$.subscribe(subscriber)
