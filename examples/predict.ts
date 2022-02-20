import { getAnswer, getGameNumber } from "../wordle.ts"

const targetDate = new Date(2022, 4, 1, 0, 0, 0, 0)

const answer = getAnswer(targetDate)
const gameNumber = getGameNumber(targetDate)

console.log(`Wordle ${gameNumber}`)
console.log(`Wordle answer on 4/1/2022 is "${answer}"!`)
