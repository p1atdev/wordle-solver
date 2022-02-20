import { serve } from "https://deno.land/std@0.125.0/http/server.ts"
import { Status, STATUS_TEXT } from "https://deno.land/std@0.125.0/http/http_status.ts"
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import "https://deno.land/x/puppeteer@9.0.2/install.ts "

const wordleURL = "https://www.nytimes.com/games/wordle/index.html"

serve(handler, { port: 80 })

console.log("http://localhost:80/")

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const path = url.pathname
    console.log("Path:", path)

    const answer = await solve()

    if (answer) {
        return new Response(JSON.stringify({ answer: answer }), {
            status: Status.OK,
            headers: new Headers({
                "content-type": "application/json",
            }),
        })
    }

    const body = JSON.stringify({ message: "NOT FOUND" })
    const res = new Response(body, {
        status: 404,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    })
    console.log(res)
    return res
}

const solve = async (): Promise<string> => {
    console.log("Solving...")

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(wordleURL)

    const state = await page.evaluate(() => {
        // get nyt-wordle-state from localStorage
        const storageData = localStorage.getItem("nyt-wordle-state")
        if (!storageData) {
            return { message: "nyt-wordle-state is not in localStorage" }
        }

        return JSON.parse(storageData)
    })

    console.log(`The answer is "${state.solution}"`)

    await page.click("body")

    const answer = state.solution

    await browser.close()

    return answer
}
