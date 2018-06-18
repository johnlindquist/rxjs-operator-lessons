import { Subscriber } from "rxjs"
class MapSubscriber extends Subscriber {
  constructor(destination, predicate) {
    super(destination)

    this.predicate = predicate
  }

  _next(value) {
    this.destination.next(this.predicate(value))
  }
}

class MapOperator {
  constructor(predicate) {
    this.predicate = predicate
  }

  call(subscriber, source) {
    source.subscribe(new MapSubscriber(subscriber, this.predicate))
  }
}

export const map = predicate => source => {
  return source.lift(new MapOperator(predicate))
}
