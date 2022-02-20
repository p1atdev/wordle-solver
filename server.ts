import { serve } from "https://deno.land/std@0.125.0/http/server.ts"
import { Status, STATUS_TEXT } from "https://deno.land/std@0.125.0/http/http_status.ts"
import { solve } from "./wordle.ts"

serve(handler, { port: 3000 })

console.log("Wordle solver is on http://localhost:3000/")

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const path = url.pathname
    console.log("Path:", path)

    switch (path) {
        case "/solve": {
            const answer = await solve()

            if (answer) {
                return new Response(JSON.stringify({ answer: answer }), {
                    status: Status.OK,
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                })
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
