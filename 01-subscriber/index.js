import { from } from "rxjs"

const observable$ = from([1, 2, 3, 4, 5])

const subscriber = {
  next: value => {
    console.log(value)
  },
  complete: () => {
    console.log("done")
  },
  error: value => {
    console.log(value)
  }
}

observable$.subscribe(subscriber)
