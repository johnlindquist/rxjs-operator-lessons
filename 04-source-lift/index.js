import { from, Subscriber } from "rxjs"

class DoubleSubscriber extends Subscriber {
  _next(value) {
    this.destination.next(value * 2)
  }
}

const oneThroughFive$ = from([1, 2, 3, 4, 5]).pipe(source => {
  return source.lift({
    call(subscriber, source) {
      source.subscribe(new DoubleSubscriber(subscriber))
    }
  })
})

oneThroughFive$.subscribe({
  next: value => {
    console.log(value)
  },
  complete: () => {
    console.log("done") //never called
  },
  error: value => {
    console.log(value) //never called
  }
})
