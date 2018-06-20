import { pipe } from "rxjs"
import { map, filter } from "rxjs/operators"

export const multiply = number =>
  pipe(
    map(value => value * number),
    filter(value => value < 10)
  )
