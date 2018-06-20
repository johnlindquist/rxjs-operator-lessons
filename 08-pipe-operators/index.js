import { from } from "rxjs"
import { multiply } from "./multiply"

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

observable$
  .pipe(multiply(3))
  .subscribe(subscriber)
observable$
  .pipe(multiply(4))
  .subscribe(subscriber)
