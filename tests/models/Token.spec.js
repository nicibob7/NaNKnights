// require('dotenv').config();

const Token = require('../../models/Token')

const db = require('../../db/db')
const { response } = require('express')

describe("Token Models unit tests", () => {

    beforeEach(() => jest.clearAllMocks())

    const testToken1 = {
        token_id: 1, 
        account_username: "bob", 
        token: "bob_token", 
        expires_at: "2023-08-23 13:17:19.960744",
        created_at: "2023-08-23 12:47:19.960744"
    }

    describe("Token class base tests", () => {

        it("Token class exists", () => {
            expect(Token).toBeDefined()
        })

        it("should create an instance of Token when initated", () => {
            const newToken = new Token(testToken1)
            expect(newToken).toBeInstanceOf(Token)
            expect(Object.keys(newToken)).toEqual(Object.keys(testToken1))
        })
    })

    describe("Token Methods:", () => {

        describe("Token.create(username)", () => {

            it("returns full token details for that username", async () => {

                const username = "bob";

                jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testToken1]});

                const result = await Token.create(username);

                expect(typeof(result)).toBe('object');
                expect(Object.keys(result).length).toBe(5);
                expect(Object.keys(result)).toEqual(Object.keys(testToken1));
                expect(Object.values(result)).toEqual(Object.values(testToken1))
            })
        })

        // describe("Token.getOneById(id)", () => {

        //     const id = 1;

        //     it("returns new instance of Token after querying a given id", async () => {


        //         jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testToken1]});

        //         const result = await Token.getOneById(id);

        //         expect(result).toBeInstanceOf(Token);
        //         expect(Object.values(result)).toEqual(Object.values(testToken1));
        //     })
        //     it("returns error if number of rows returned does not equal 1", async () => {

        //         let error1 = new Error("Unable to locate token")

        //         jest.spyOn(db, 'query').mockRejectedValueOnce(error1);

        //         try {
        //             await Token.getOneById(id) 
        //         } catch (error) {
        //             expect(error).toBeInstanceOf(Error)
        //             expect(error.message).toBe("Unable to locate token")
        //         }
        //     })
        // })

        describe("Token.getOneByToken(token)", () => {

            const token = "bob_token";

            it("returns new instance of Token after querying a given token", async () => {


                jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testToken1]});

                const result = await Token.getOneByToken(token);

                expect(result).toBeInstanceOf(Token);
                expect(Object.values(result)).toEqual(Object.values(testToken1));
            })
            it("returns error if number of rows returned does not equal 1", async () => {

                let error1 = new Error("Unable to locate token")

                jest.spyOn(db, 'query').mockRejectedValueOnce(error1);

                try {
                    await Token.getOneByToken(token) 
                } catch (error) {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate token")
                }
            })
        })

        describe("Token.deleteByToken(token)", () => {

            it("does not return a value so it should be falsy", async() => {

                const token = "bob_token";

                jest.spyOn(db,'query').mockResolvedValueOnce();

                const result = await Token.deleteByToken(token);
                expect(result).toBeFalsy();

            })
            
        })

        // describe("Token.deleteById(id)", () => {

        //     it("does not return a value so it should be falsy", async() => {

        //         const id = 1;

        //         jest.spyOn(db,'query').mockResolvedValueOnce();

        //         const result = await Token.deleteById(id);
        //         expect(result).toBeFalsy();

        //     })
            
        // })

        describe("Token.deleteAllByUsername(username)", () => {

            it("does not return a value so it should be falsy", async() => {

                const username = "bob";

                jest.spyOn(db,'query').mockResolvedValueOnce();

                const result = await Token.deleteAllByUsername(username);
                expect(result).toBeFalsy();

            })
            
        })

        describe("tokenInstance.isExpired() instance method", () => {

            it("should return FALSE if the current new Date for comparison is less than the expiry date", async () => {

                const modToken = {
                    token_id: 1, 
                    account_username: "bob", 
                    token: "bob_token", 
                    expires_at: new Date("Wed Aug 23 2024 22:12:58 GMT+0100 (British Summer Time)"),
                    created_at: "2023-08-23 12:47:19.960744"
                }

                let newToken = new Token(modToken)

                jest.spyOn(db, 'query')
                .mockResolvedValue({rows: [modToken]});

                const result = await newToken.isExpired();
                expect(result).toBe(false);
            })

            it("should return TRUE if the current new Date for comparison is greater than the expiry date", async () => {

                let newToken = new Token(testToken1)
                
                jest.spyOn(db, 'query')
                .mockResolvedValue({rows: [newToken]});

                const result = await newToken.isExpired();
                expect(result).toBe(true);
            })

            it("should throw error if there is not 1 db response row", async () => {

                let newToken = new Token(testToken1)

                let error1 = new Error("Unable to locate token")

                jest.spyOn(db, 'query').mockRejectedValueOnce(error1);

                try {
                    await newToken.isExpired() 
                } catch (error) {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate token")
                }
            })
        })

    })
})
