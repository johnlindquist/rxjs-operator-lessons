import { from, Observable, Subscriber } from "rxjs"

class DontDoThis extends Subscriber {
  _next(value) {
    this.destination.next(value + ` - Don't do this!!!`)
  }
}

const oneThroughFive$ = from([1, 2, 3, 4, 5]).pipe(source => {
  //don't do this
  const observable$ = new Observable()
  observable$.source = source
  observable$.operator = {
    call(subscriber, source) {
      source.subscribe(new DontDoThis(subscriber))
    }
  }

  return observable$
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
