import { getAnswer, getGameNumber } from "../wordle.ts"

const targetDate = new Date(2023, 12, 25, 0, 0, 0, 0)

const answer = getAnswer(targetDate)
const gameNumber = getGameNumber(targetDate)

console.log(`Wordle ${gameNumber}`)
console.log(`Wordle answer on 12/25/2023 is "${answer}"!`)
