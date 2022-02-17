Deno.env.set("PUPPETEER_PRODUCT", "chrome")
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import "https://deno.land/x/puppeteer@9.0.2/install.ts "

export const wordleURL = "https://www.nytimes.com/games/wordle/index.html"

export const solve = async (): Promise<string> => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(wordleURL)

    const state = await page.evaluate(() => {
        // get nyt-wordle-state from localStorage
        const storageData = localStorage.getItem("nyt-wordle-state")
        if (!storageData) {
            throw new Error("nyt-wordle-state is not in localStorage")
        }
        return JSON.parse(storageData)
    })

    const answer = state.solution

    await browser.close()

    return answer
}
