import { Subscriber } from "rxjs"

class MultiplySubscriber extends Subscriber {
  constructor(subscriber, number) {
    super(subscriber)

    this.number = number
  }

  _next(value) {
    console.log(this.number)
    console.log(value)
    this.destination.next(value * this.number)
  }
}

export const multiply = number => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MultiplySubscriber(sub, number))
    }
  })
