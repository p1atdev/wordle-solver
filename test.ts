import { assertEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts"
import { solve } from "./wordle.ts"

Deno.test("solve wordle", async () => {
    const answer = await solve()
    assertEquals(typeof answer, "string")
})
