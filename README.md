# Wordle Solver with Deno

A wordle solver with Deno.

![](./wordle.png)

# How to use
Example codes are available in `/examples`!

## Basic usage

```ts
// example.ts

import { getAnswer, getGameNumber } from "./wordle.ts"

const answer = getAnswer()
const gameNumber = getGameNumber()

console.log(`Wordle ${gameNumber}`)
console.log(`Today's wordle answer is "${answer}"!`)

```

Run `example.ts` as follows
```bash
deno run example.ts
```

The result is
```
Wordle 247
Today's wordle answer is "other"!
```

## Predicting future answers 
I wrote "prediction", but it is almost certainly true.

```ts
// predict.ts

import { getAnswer, getGameNumber } from "../wordle.ts"

const targetDate = new Date(2022, 4, 1, 0, 0, 0, 0)

const answer = getAnswer(targetDate)
const gameNumber = getGameNumber(targetDate)

console.log(`Wordle ${gameNumber}`)
console.log(`Wordle answer on 4/1/2022 is "${answer}"!`)

```

The result is
```
Wordle 316
Wordle answer on 4/1/2022 is "trash"!
```


# How it works
In the main.hoge.js file of Wordle, the list of all answers is hard-coded, and the index of the game answer is equal to the difference between a particular date and today's date.
If wordle changes its specification and generates answers in a different way than it does now, this will stop working, but the list of answers is about six years long, so you may not need to worry about it for the time being.