import { from } from "rxjs"
import { multiply } from "./multiply"

const oneThroughFive$ = from([1, 2, 3, 4, 5])

oneThroughFive$.pipe(multiply(2)).subscribe({
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

oneThroughFive$.pipe(multiply(3)).subscribe({
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
