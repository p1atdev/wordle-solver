import { getAnswer, getGameNumber } from "../wordle.ts"

const answer = getAnswer()
const gameNumber = getGameNumber()

console.log(`Wordle ${gameNumber}`)
console.log(`Today's wordle answer is "${answer}"!`)
