import { from } from "rxjs"
import { map } from "./map"

const oneThroughFive$ = from([1, 2, 3, 4, 5])

oneThroughFive$.pipe(map(value => value * 2)).subscribe({
  next: value => value /*?*/,
  complete: () => "done" /*?*/, //never called
  error: value => value /*?*/ //never called
})

oneThroughFive$.pipe(map(value => value * 3)).subscribe({
  next: value => value.log /*?*/,

  complete: () => "done" /*?*/,

  error: value => value /*?*/
})
