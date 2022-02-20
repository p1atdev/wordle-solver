import { WordleAnswers } from "./dictionary.ts"

const TheDay = new Date(2021, 5, 19, 0, 0, 0, 0)

export const getAnswer = (date?: Date | null): string => {
    const today = date ?? new Date()
    const diffDay = Math.floor((today.getTime() - TheDay.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDay > 0 && diffDay < WordleAnswers.length) {
        const answer = WordleAnswers[diffDay]

        return answer
    } else {
        throw "Invalid date"
    }
}

export const getGameNumber = (date?: Date | null): number => {
    const today = date ?? new Date()
    const diffDay = Math.floor((today.getTime() - TheDay.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDay > 0 && diffDay < WordleAnswers.length) {
        return diffDay
    } else {
        throw "Invalid date"
    }
}
