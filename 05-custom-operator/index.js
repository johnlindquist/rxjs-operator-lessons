import { from, Subscriber } from "rxjs"

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

const oneThroughFive$ = from([1, 2, 3, 4, 5]).pipe(source => {
  return source.lift(new MultiplyOperator(2))
})

oneThroughFive$.subscribe({
  next: value => {
    console.log(value)
  },
  complete: () => {
    console.log("done")
  },
  error: value => {
    console.log(value) //never called
  }
})
