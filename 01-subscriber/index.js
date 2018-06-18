import { Observable } from "rxjs"

const myObservable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.error(":(")
  subscriber.complete() //error prevents complete
  subscriber.next(3) //error prevents next
})

myObservable.subscribe({
  next: value => value /*?*/,
  complete: () => "done" /*?*/,
  error: value => value /*?*/
})
