import { fromEvent, of, Subscriber } from "rxjs"
import {
  scan,
  delay,
  mergeMap,
  switchMap,
  concatMap
} from "rxjs/operators"

class MyConcatMapSubscriber extends Subscriber {
  innerSubscription
  buffer = []

  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    const { isStopped } = this.innerSubscription || {
      isStopped: true
    }

    if (!isStopped) {
      this.buffer = [...this.buffer, value]
    } else {
      const o$ = this.fn(value)

      this.innerSubscription = o$.subscribe({
        next: value => {
          this.destination.next(value)
        },
        complete: () => {
          console.log(this.buffer)
          if (this.buffer.length) {
            const [first, ...rest] = this.buffer
            this.buffer = rest
            this._next(first)
          }
        }
      })
    }
  }
}

const myConcatMap = fn => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MyConcatMapSubscriber(sub, fn))
    }
  })

const observable$ = fromEvent(document, "click").pipe(
  scan(i => i + 1, 0),
  myConcatMap(value => of(value).pipe(delay(1000)))
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
