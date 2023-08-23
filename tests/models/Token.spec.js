require('dotenv').config();

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
