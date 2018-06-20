import { Subscriber } from "rxjs"
import { InnerSubscriber } from "rxjs/internal/InnerSubscriber"

class SwitchMapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    const o$ = this.fn(value)

    o$.subscribe(this.destination)
  }
}

export const switchMap = fn => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(
        new SwitchMapSubscriber(sub, fn)
      )
    }
  })
