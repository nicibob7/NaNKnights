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
        votes: 1,
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

    describe("Suggestion.create(data)", () => {

        it("Returns the full suggestion details from newly created suggestion entry in database", async () => {

            const frontendSugg = {
                title: "suggestion1",
                description: "this is a suggestion",
                date_posted: "2023-08-23 12:47:19.960744",
                posted_by: "bob",
                votes: 1,
                image: null,
                urgency_level: "low"
            }

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [suggestion1]});

            const result = await Suggestion.create(frontendSugg);
            expect(typeof(result)).toBe('object')
            expect(Object.keys(result)).toEqual(Object.keys(suggestion1));
            expect(Object.values(result)).toEqual(Object.values(suggestion1));
        })
    })

})
