const Information = require("../../models/Information");

const db = require('../../db/db')

describe("Informaion Model unit tests", () => {

    const fullInfo = {
        id: "1",
        title: "information 1",
        description: "This is information 1",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "admin",
        type: "International news",
        image: "\x696d61676520706c616365686f6c646572"
    }

    const fullInfo2 = {
        id: "2",
        title: "information 2",
        description: "This is information 2",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "admin",
        type: "IT news",
        image: "\x696d61676520706c616365686f6c646572"
    }

    const frontEndInfo = {
        title: "information 1",
        description: "This is information 1",
        type: "International news",
        image: "\x696d61676520706c616365686f6c646572",
        posted_by: "admin"
    }
    

    beforeEach(() => jest.clearAllMocks())

    describe("Information class base tests", () => {

        it("Information class exists", () => {
            expect(Information).toBeDefined()
        })

        it("should create an instance of Information when initated", () => {
            const newInformation = new Information(fullInfo)
            expect(newInformation).toBeInstanceOf(Information)
        })
    })

    describe("Information.create(data)", () => {

        it("Should return newly created db data", async () => {
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [fullInfo]});

        const result = await Information.create(frontEndInfo)
        expect(typeof(result)).toBe('object')

        })

        it("image value from returned data should be reformatted to base64 with KB conversion (e.g. '0.03 KB image file')", async () => {
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [fullInfo]});

            const result = await Information.create(frontEndInfo)
            expect(result.image).toContain('KB image file')
        })
    })

    describe("Information.getAll()", () => {

        it("Should return all data entries from 'information' table and convert non-bytearray data to strings", async () => {
            const fullInfo3 = {
                id: "3",
                title: "information 3",
                description: "This is information 2",
                date_posted: "2023-08-24 12:52:02.669291",
                posted_by: "admin",
                type: "IT news",
                image: 12
            }

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [fullInfo, fullInfo3]});

            const result = await Information.getAll()
            expect(typeof(result[1].image)).toBe('string')
            expect(result.length).toBe(2)
        })

        it("database query results with bytearray data-type image values are converted to base64 with KB conversion (e.g. '0.03 KB image file')", async () => {
            
            const fullInfo3 = {
                id: "3",
                title: "information 3",
                description: "This is information 2",
                date_posted: "2023-08-24 12:52:02.669291",
                posted_by: "admin",
                type: "IT news",
                image: 12
            }

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [fullInfo, fullInfo3]});

            const result = await Information.getAll()
            expect(result[0].image).toContain('KB image file')

        })

    })

})
