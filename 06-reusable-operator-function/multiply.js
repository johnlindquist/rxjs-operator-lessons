import { Subscriber } from "rxjs"
class MultiplySubscriber extends Subscriber {
  constructor(destination, multiplier) {
    super(destination)

    this.multiplier = multiplier
  }

  _next(value) {
    this.destination.next(value * this.multiplier)
  }
}

class MultiplyOperator {
  constructor(multiplier) {
    this.multiplier = multiplier
  }

  call(subscriber, source) {
    source.subscribe(new MultiplySubscriber(subscriber, this.multiplier))
  }
}

export const multiply = number => source => {
  return source.lift(new MultiplyOperator(number))
}
