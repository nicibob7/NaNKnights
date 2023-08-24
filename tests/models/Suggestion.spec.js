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

    describe("Suggestion.getAllByNotActivated()", () => {

        it("Should return the all rows of suggestions where is_activated value equals FALSE", async () => {

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [suggestion1, suggestion1]});

            const result = await Suggestion.getAllByNotActivated();
            expect(result).toHaveLength(2);
            expect(typeof(result)).toBe('object');
            expect(Object.keys(result[0])).toEqual(Object.keys(suggestion1));
            expect(Object.values(result[0])).toEqual(Object.values(suggestion1));
            
        })
    })
    // DO GETALL() METHOD

    // describe("Suggestion.getAll()", () => {

    //     it("Should return all suggestions with falsy image values being changed to base64", async () => {


    //     })
    // })

    describe("Suggestion.getSuggestionByPopularity()", () => {

        it("Should return an array representing rows of suggestions in descending order of popularity", async () => {
            
            const suggestion2 = {
                id: 3,
                title: "suggestion1",
                description: "this is a suggestion",
                date_posted: "2023-08-23 12:47:19.960744",
                posted_by: "bob",
                votes: 6,
                is_resolved: false,
                is_activated: true,
                image: null,
                urgency_level: "low"
            }

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [suggestion2, suggestion1]});

            const result = await Suggestion.getSuggestionsByPopularity();
            expect(result).toHaveLength(2);
            expect(typeof(result)).toBe('object');
            expect(Object.keys(result[0])).toEqual(Object.keys(suggestion1));
            expect(Object.values(result[0])).toEqual(Object.values(suggestion2));
            
        })
    })

    // THREE METHODS LEFT
    describe("Suggestion.getById(id)", () => {

        it("Should return all data from one suggestion that matches the id provided", async () => {

            const id = 1

            const mockQueryRes = jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ 
                    rows: [suggestion1]
                });

            const result = await Suggestion.getById(id)

            // expect(Object.keys(result).length).toBe(10);
            // expect(result.id).toEqual(id);
            // expect(typeof(result)).toBe('object');
            // expect(Object.keys(result)).toEqual(Object.keys(suggestion1));
            // expect(Object.values(result)).toEqual(Object.values(suggestion1));
            expect(mockQueryRes).toBeCalledTimes(1)
        })
    })

})
