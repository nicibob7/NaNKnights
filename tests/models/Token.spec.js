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
            console.log(newToken)
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

        describe("Token.getOneById(id)", () => {

            const id = 1;

            it("returns new instance of Token after querying a given id", async () => {


                jest.spyOn(db,'query').mockResolvedValueOnce({rows: [testToken1]});

                const result = await Token.getOneById(id);

                expect(result).toBeInstanceOf(Token);
                expect(Object.values(result)).toEqual(Object.values(testToken1));
            })
            it("returns error if number of rows returned does not equal 1", async () => {

                let error1 = new Error("Unable to locate token")

                jest.spyOn(db, 'query').mockRejectedValueOnce(error1);

                try {
                    await Token.getOneById(id) 
                } catch (error) {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate token")
                }
            })
        })

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

    })

    // describe("async isExpired() instance method", () => {

    //     beforeEach(() => {
    //         jest.clearAllMocks()
    //     })

    //     afterEach(() => {
    //         jest.clearAllMocks()
    //     })

    //     it("test", async () => {
                
            
            
    //         Token.prototype.isExpired = jest.fn( async () => {
    //             const response = await db.query("SELECT * FROM token WHERE token = $1", [
    //                 this.token,
    //             ]);
    //             if (response.rows.length !== 1) {
    //                 throw new Error("Unable to locate token.");
    //             } else {
    //                 const tokenObj = new Token(response.rows[0]);
        
    //                 const expiry = new Date(tokenObj.expires_at);
    //                 return new Date() > expiry;
    //             }
    //         })
            
    //         let newToken = new Token({token_id: 1, account_username: "bob", token: "bob_token", expires_at: "2023-08-23 13:17:19.960744", created_at: "2023-08-23 12:47:19.960744"})

    //         // jest.spyOn(db,'query').mockRejectedValueOnce()
    //         const response = await newToken.isExpired()
    //         console.log(response.rows)

    //     })


    // })

    
    
})
