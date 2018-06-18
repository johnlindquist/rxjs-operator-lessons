import { from } from "rxjs"
import { multiply } from "./multiply"

const oneThroughFive$ = from([1, 2, 3, 4, 5])

oneThroughFive$.pipe(multiply(2)).subscribe({
  next: value => value /*?*/,
  complete: () => "done" /*?*/, //never called
  error: value => value /*?*/ //never called
})

oneThroughFive$.pipe(multiply(3)).subscribe({
  next: value => value /*?*/,
  complete: () => "done" /*?*/, //never called
  error: value => value /*?*/ //never called
})
