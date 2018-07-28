# Build Your Own RxJS Pipeable Operators

RxJS pushes values from Observables which get handed off to Subscribers to take care of the output. Operators handle all of the "in-between" operations where you can manipulate the values while they're still in-flight. This course dives into the internals of Operators and Subscribers and how to customize operators to your specific needs.

## Create a Generic Subscriber in RxJS

01

Observables never run until you invoke them with `subscribe`. This also means that the values from the observable don't go anywhere unless you use a `subscriber`. A basic subscriber is either a function to handle the `next` value or an object with functions to handle `next`, `complete`, and `error` scenarios.

## Extend Subscriber to Override `_next` in RxJS

02

The `Subscriber` class exposes a `_next` method which you can override to handle how the destination's `next` function will be called. This allows you to create your own variations of the `Subscriber` class to intercept what happens between the observable and the destination subscriber.

## Learn the Internals of `pipe` in RxJS

03

Observable's `pipe` method is all about connecting a `source` to a `subscriber` through an operator. While you would normally manually invoke connect the pieces together the way this lesson does, it's important to understand how the internals work before working with the RxJS api.

## Use `lift` to Connect a `source` to a `subscriber` in RxJS

04

The `lift` method on each source hides away the internals of RxJS so you can simply connect a `source` to the `subscriber` you're working with. The `lift` method take an object with a `call` function with `subscriber` and `source` arguments, then it's up to you how you want to connect them together.

## Create a Reusable Operator from Scratch in RxJS

05

With knowledge of extending `Subscriber` and using `source.lift` to connect a `source` to a `subscriber`, you can now create your own operators by writing functions that return a `source.lift` call. This lesson creates a simple "multiply" operator in RxJS.

## Create Operators from Existing Operators in RxJS

06

The most common scenario for creating custom operators is to reuse the built-in operators shipped with RxJS. You'll find yourself re-using `map`, `filter`, and others will solve most of the problems you come across.

## Implement the `map` Operator from Scratch in RxJS

07

While it's great to use the RxJS built-in operators, it's also important to realize you now have the knowledge to write them by yourself if needed. The `map` operator turns out to be a simple `MapSubscriber` which takes a function and applies it to the value passed to `next`.

## Implement `pipe` from Scratch to Chain Operators in RxJS

08

Instead of writing complex operators, it's usually best to write simple, single-purpose operators then chain them together when necessary. The `pipe` function takes functions as arguments, invokes each function with the value, then passes the returned result on to the next function.

## Implement `mergeMap` from Scratch in RxJS

09

Understanding sources and subscribers makes it much easier to understand what's going on with `mergeMap` under the hood. Where a typical operator invokes `destination.next` directly, `mergeMap` wraps `destination.next` inside of a new source/subscriber combo so there's an "outer" next and an "inner" next.

## Implement `switchMap` from Scratch in RxJS

10

`switchMap` is `mergeMap` that checks for an "inner" subscription. If the "inner" subscription exists, `switchMap` unsubscribes from that "inner" subscription which effectively "cancels" any pending pushes.

## Implement `concatMap` from Scratch in RxJS

11

Unlike `mergeMap` and `switchMap`, `concatMap` focuses on when "inner" subscriptions "complete" by using a "buffer". Each time `concatMap` receives a value, it adds each value to a "buffer", waits for previous "inner" subscription to `complete`, then invokes `next` with the next value from the "buffer".

## `add` Inner Subscriptions to Outer Subscribers to `unsubscribe` in RxJS

12

When subscribers create new "inner" sources and subscriptions, you run the risk of losing control of them when the outer subscriber unsubscribes. This is handled easily enough if you use the `add` method from the `Subscriber` class to add the "inner" subscription to the Subscriber.
