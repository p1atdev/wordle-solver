import { solve } from "../wordle.ts"

console.log("Let's solve Wordle!")

const answer = await solve()

console.log(`The answer is "${answer}"!`)
