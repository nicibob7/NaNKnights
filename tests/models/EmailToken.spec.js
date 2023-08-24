const EmailToken = require("../../models/EmailToken");

const db = require('../../db/db')
const base_url = require("../../security/serverUrl");

describe("EmailToken Model unit tests", () => {

    const emailTokenDB = {
        id: "1",
        username: "jane",
        token: "jane_token",
        created_at: "2023-08-24 12:52:02.669291",
        expires_at: "2023-08-24 12:52:02.669291",
        is_reset: false
    }

    const emailTokenDB2 = {
        id: "2",
        username: "jack",
        token: "jack_token",
        created_at: "2023-08-24 12:52:02.669291",
        expires_at: "2023-08-24 12:52:02.669291",
        is_reset: false
    }

    const shortVersionUser = {
        username: "jane",
        token: "jane_token",
    }
    

    beforeEach(() => jest.clearAllMocks())

    describe("EmailToken class base tests", () => {

        it("Suggestion class exists", () => {
            expect(EmailToken).toBeDefined();
        })

        it("should create an instance of EmailToken when initated", () => {
            const newEmailToken = new EmailToken(shortVersionUser);
            expect(newEmailToken).toBeInstanceOf(EmailToken);
        })

        it("The instance of EmailToken should only have one object and one value", () => {
            const newEmailToken = new EmailToken(shortVersionUser)
            expect(Object.keys(newEmailToken).length).toEqual(1);
            expect(Object.values(newEmailToken).length).toEqual(1);
        })
    })

    describe("EmailToken.create(username)", () => {

        it("Should return a correctly formatted URL composed of 'base_url' + 'users/verify/' + 'token'", async () => {
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [emailTokenDB]});

            const result = await EmailToken.create("jane")
            expect(typeof(result)).toBe("string")
            expect(result).toContain("users/verify/")
            expect(result).toContain("http")
        })
    })

    describe("EmailToken.getOneByToken()", () => {

        it("returns new instance of Token after querying a given token", async () => {


            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [emailTokenDB]});

            const result = await EmailToken.getOneByToken(shortVersionUser.token);

            expect(Object.values(result)).toEqual(Object.values(emailTokenDB));
        })

        it("returns error if number of rows returned does not equal 1", async () => {

            let error1 = new Error("Token has been used or expired")

            jest.spyOn(db, 'query').mockRejectedValueOnce(error1);

            try {
                await EmailToken.getOneByToken(shortVersionUser.token) 
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Token has been used or expired")
            }
        })

        describe("EmailToken.deleteByToken(token)", () => {

            it("does not return a value so it should be falsy", async () => {

                const token = shortVersionUser.token;

                jest.spyOn(db,'query').mockResolvedValueOnce()

                const result = await EmailToken.deleteByToken(token);
                expect(result).toBeFalsy();
            })
            
        })

        describe("EmailToken.deleteByUsername(username)", () => {

            it("does not return a value so it should be falsy", async () => {

                const username = shortVersionUser.username;

                jest.spyOn(db,'query').mockResolvedValueOnce({Result: 
                    {
                        command: 'DELETE',
                        rowCount: 0,
                        oid: null,
                        rows: [],
                        fields: [],
                        _parsers: undefined,
                        RowCtor: null,
                        rowAsArray: false
                    }
                })

                const result = await EmailToken.deleteByToken(username);
                expect(result).toBeFalsy();
            })
            
        })
    })

    // describe("EmailToken.()", () => {

    //     it("", async () => {
            
    //         jest.spyOn(db,'query').mockResolvedValueOnce({rows: []});

    //         const result = ;
    //     })
    // })

})
