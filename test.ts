import { assertEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts"
import { getAnswer, getGameNumber } from "./wordle.ts"

Deno.test("get today's answer of wordle", () => {
    const answer = getAnswer()
    console.log("Today's wordle answer is", answer)
    assertEquals(typeof answer, "string")
})

Deno.test("get wordle game number of today", () => {
    const gameNumber = getGameNumber()
    console.log("Today's wordle game number is", gameNumber)
    assertEquals(typeof gameNumber, "number")
})

Deno.test("get the answer of wordle on 2/22/2022", () => {
    const answer = getAnswer(new Date(2022, 1, 22, 0, 0, 0, 0))
    console.log("The answer of wordle on 2/22/2022 is", answer)
    assertEquals(answer, "thorn")
})

Deno.test("get wordle game number of 2/22/2022", () => {
    const gameNumber = getGameNumber()
    console.log("The game number of wordle on 2/22/2022 is", gameNumber)
    assertEquals(gameNumber, 246)
})
