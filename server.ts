import { serve } from "https://deno.land/std@0.125.0/http/server.ts"
import { Status, STATUS_TEXT } from "https://deno.land/std@0.125.0/http/http_status.ts"
import { getAnswer, getGameNumber } from "./wordle.ts"

serve(handler, { port: 80 })

console.log("Wordle solver is on http://localhost:80/")

function handler(req: Request): Response {
    // async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const path = url.pathname
    console.log("Path:", path)

    switch (path) {
        case "/answer": {
            try {
                console.log(url.searchParams.get("date"))
                const paramDate = url.searchParams.get("date")

                const date = paramDate ? new Date(paramDate!) : new Date()

                const answer = getAnswer(date)
                const gameNumber = getGameNumber(date)

                const body = JSON.stringify({
                    gameNumber: gameNumber,
                    answer: answer,
                })
                return new Response(body, {
                    status: Status.OK,
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                })
            } catch (err) {
                return new Response(
                    JSON.stringify({
                        code: Status.BadRequest,
                        description: STATUS_TEXT.get(Status.BadRequest),
                        message: err,
                    }),
                    {
                        status: Status.NotFound,
                        headers: new Headers({
                            "content-type": "text/plain",
                        }),
                    }
                )
            }
        }
    }

    const body = JSON.stringify({ message: STATUS_TEXT.get(Status.NotFound) })
    const res = new Response(body, {
        status: 404,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    })
    console.log(res)
    return res
}
