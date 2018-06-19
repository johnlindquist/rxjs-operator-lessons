import { Subscriber } from "rxjs"

class MapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    this.destination.next(this.fn(value))
  }
}

export const map = fn => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MapSubscriber(sub, fn))
    }
  })
