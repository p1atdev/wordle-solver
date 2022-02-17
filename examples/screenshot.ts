Deno.env.set("PUPPETEER_PRODUCT", "chrome")
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import "https://deno.land/x/puppeteer@9.0.2/install.ts "

const wordleURL = "https://www.nytimes.com/games/wordle/index.html"

const solveWithScreenShot = async (): Promise<string> => {
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

    // click body to close popup
    await page.click("body")

    // enter the answer
    await page.type("body", answer)
    await page.keyboard.down("Enter")

    // wait a few seconds and take a screenshot
    await page.waitForTimeout(3000)
    await page.screenshot({ path: `./wordle-${Date.toString}.png` })

    await browser.close()

    return answer
}

// Let's solve!
const answer = await solveWithScreenShot()
console.log(`The answer is ${answer}`)
