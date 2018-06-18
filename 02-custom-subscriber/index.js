import { Observable, Subscriber } from "rxjs"

class DoubleSubscriber extends Subscriber {
  _next(value) {
    this.destination.next(value * 2)
  }
}

const myObservable = new Observable(subscriber => {
  const mySub = new DoubleSubscriber(subscriber)
  mySub.next(1)
  mySub.next(2)
  mySub.next(3)
  mySub.next(4)
})

myObservable.subscribe({
  next: value => value /*?*/,
  complete: () => "done" /*?*/, //never called
  error: value => value /*?*/ //never called
})
