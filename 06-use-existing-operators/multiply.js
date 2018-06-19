import { map } from "rxjs/operators"

export const multiply = number =>
  map(value => value * number)
