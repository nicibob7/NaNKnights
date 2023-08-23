const Suggestion = require('../../models/Suggestion')

const db = require('../../db/db')
const { response } = require('express')

describe("Suggestion Models unit tests", () => {

    const suggestion1 = {
        id: 1,
        title: "suggestion1",
        description: "this is a suggestion",
        date_posted: "2023-08-23 12:47:19.960744",
        posted_by: "bob",
        votes: 0,
        is_resolved: false,
        is_activated: false,
        image: null,
        urgency_level: "low"
    }

    beforeEach(() => jest.clearAllMocks())

    describe("Suggestion class base tests", () => {

        it("Suggestion class exists", () => {
            expect(Suggestion).toBeDefined()
        })

        it("should create an instance of Token when initated", () => {
            const newSuggestion = new Suggestion(suggestion1)
            expect(newSuggestion).toBeInstanceOf(Suggestion)
        })
    })


})
