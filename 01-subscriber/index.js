import { Observable } from "rxjs"

const observable$ = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.error(":(")
  subscriber.next(3) //error prevents next
  subscriber.complete() //error prevents complete
})

observable$.subscribe({
  next: value => {
    console.log(value)
  },
  complete: () => {
    console.log("done")
  },
  error: value => {
    console.log(value)
  }
})
