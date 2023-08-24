const User = require('../../models/User')

const db = require('../../db/db')
const { response } = require('express')

describe("User Models unit tests", () => {

    beforeEach(() => jest.clearAllMocks())

    const userNoId = {
        username: "username1", 
        password: "password1", 
        email: "username1@email.com", 
        first_name: "user1", 
        last_name: "userlast1", 
        phone_number: "+123user1", 
        postal_code: "US ER1"}

    describe("User class", () => {

        it('exists', () => {
            expect(User).toBeDefined()
        })

        it('should be an instance of User', () => {
            const testUser = {
                username: "username1", 
                password: "password1", 
                email: "username1@email.com", 
                first_name: "user1", 
                last_name: "userlast1", 
                phone_number: "+123user1", 
                postal_code: "US ER1"
            }

            const user = new User(testUser)
            expect(user).toBeInstanceOf(User)
            expect(Object.keys(user)).toEqual(Object.keys(testUser))
        })

        it('correctly structured input data should return be returned in instance format', () => {
            const testUser = {id: 1, username: "username1", password: "password1", email: "username1@email.com", first_name: "user1", last_name: "userlast1", phone_number: "+123user1", postal_code: "US ER1", is_activated: false}

            const user = new User({testUser})
            expect(Object.keys(user)).toEqual(Object.keys(userNoId))
        })

        // run test to check for when data is input correctly

    })

    describe("User Methods", () => {

        describe("User.getAllUsers()", () => {

            beforeEach(() => jest.clearAllMocks())

            it("resolves the Users successfully", async () => {
                jest.spyOn(db, 'query').mockResolvedValueOnce({
                    rows: 
                        [{
                            id: 1, 
                            username: "username1", 
                            password: "password1", 
                            email: "username1@email.com", 
                            first_name: "user1", 
                            last_name: "userlast1", 
                            phone_number: "+123user1", 
                            postal_code: "US ER1"
                        }]
                    });
                
                const newUser = await User.getAllUsers()
                expect(newUser.rows).toHaveLength(1)
            })
        })

        describe("User.getById(id)", () => {
            beforeEach(() => jest.clearAllMocks())

            it('resolves the user on successful db query of user id', async () => {
                
                const userData1 = {
                    id: 1, username: "username1",
                    password: "password1",
                    email: "username1@email.com",
                    first_name: "user1", 
                    last_name: "userlast1",
                    phone_number: "+123user1", 
                    postal_code: "US ER1"
                }

                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [userNoId]});

                const result = await User.getById(userData1.id)
                expect(Object.keys(result).length).toBe(7)
                expect(typeof(result)).toBe('object')
                expect(Object.keys(result)).toEqual(Object.keys(userNoId))
            })
            //test that the error message gets sent when an error occurs
            it('throws error if number or rows returned is not 1', async () => {

                let error1 = new Error("Unable to locate user")

                jest.spyOn(db, 'query').mockRejectedValue(error1)

                try {
                    const response = await User.getById(3)
                } catch (error) {
                    expect(error).toBeTruthy()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate user")
                }
            })

        })

        describe("User.getByUsername(username)", () => {
            beforeEach(() => jest.clearAllMocks())

            it('resolves the user on successful db query of username', async () => {
                
                const userData1 = {
                    id: 1, username: "username1",
                    password: "password1",
                    email: "username1@email.com",
                    first_name: "user1", 
                    last_name: "userlast1",
                    phone_number: "+123user1", 
                    postal_code: "US ER1"
                }

                jest.spyOn(db, 'query')
                    .mockResolvedValueOnce({ rows: [userNoId]});

                const result = await User.getByUsername(userData1.username)
                expect(Object.keys(result).length).toBe(7)
                expect(typeof(result)).toBe('object')
                expect(Object.keys(result)).toEqual(Object.keys(userNoId))
            })
            //test that the error message gets sent when an error occurs
            it('throws error if number or rows returned is not 1', async () => {

                let error1 = new Error("Unable to locate user")

                jest.spyOn(db, 'query').mockRejectedValue(error1)

                try {
                    const response = await User.getByUsername('jeff')
                } catch (error) {
                    expect(error).toBeTruthy()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate user")
                }
            })

        })

        describe("User.getOneByEmail(email)", () => {
            beforeEach(() => jest.clearAllMocks())

            it('resolves the user on successful db query of email', async () => {
                
                const userData1 = {
                    id: 1, username: "username1",
                    password: "password1",
                    email: "username1@email.com",
                    first_name: "user1", 
                    last_name: "userlast1",
                    phone_number: "+123user1", 
                    postal_code: "US ER1"
                }

                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [userData1]});

                const result = await User.getOneByEmail(userData1.email)
                expect(Object.keys(result).length).toBe(7)
                expect(typeof(result)).toBe('object')
                expect(Object.keys(result)).toEqual(Object.keys(userNoId))
            })
            //test that the error message gets sent when an error occurs
            it('throws error if number or rows returned is not 1', async () => {

                let error1 = new Error("Unable to locate user")

                jest.spyOn(db, 'query').mockRejectedValue(error1)

                try {
                    const response = await User.getOneByEmail('wrong@email.com')
                } catch (error) {
                    expect(error).toBeTruthy()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate user")
                }
            })

        })

        describe("User.delete()", () => {

            beforeEach(() => jest.clearAllMocks())

            it('resolves the user on successful db delete by id query', async () => {

                const userData1 = {
                    id: 1, username: "username1",
                    password: "password1",
                    email: "username1@email.com",
                    first_name: "user1", 
                    last_name: "userlast1",
                    phone_number: "+123user1", 
                    postal_code: "US ER1",
                    is_activated: true
                }

                const dbRemainingUser = {
                    id: 1, username: "username2",
                    password: "password2",
                    email: "username2@email.com",
                    first_name: "user2", 
                    last_name: "userlast2",
                    phone_number: "+123user2", 
                    postal_code: "US ER2",
                    is_activated: true
                }

                let newUser = new User({userData1})

                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData1]}).mockResolvedValueOnce({rows: [dbRemainingUser]});

                const result = await User.delete(newUser.id)
                expect(result.rows[0]).toEqual(dbRemainingUser);
                expect(typeof(result)).toBe('object')
            })

            it('throws error if the user on successful db delete by id query', async () => {

                const userData1 = {
                    id: 1, username: "username1",
                    password: "password1",
                    email: "username1@email.com",
                    first_name: "user1", 
                    last_name: "userlast1",
                    phone_number: "+123user1", 
                    postal_code: "US ER1",
                    is_activated: true
                }

                const dbRemainingUser = {
                    id: 1, username: "username2",
                    password: "password2",
                    email: "username2@email.com",
                    first_name: "user2", 
                    last_name: "userlast2",
                    phone_number: "+123user2", 
                    postal_code: "US ER2",
                    is_activated: true
                }

                let newUser = new User({userData1})

                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData1]}).mockResolvedValueOnce({rows: [dbRemainingUser]});

                const result = await User.delete(newUser.id)
                expect(result.rows[0]).toEqual(dbRemainingUser);
                expect(typeof(result)).toBe('object')
            })

        })

        describe("User.getAllNonActivated()", () => {

            beforeEach(() => jest.clearAllMocks())
            // To pass the data must return result.rows from db and have 7 keys per object
            it('resolves the user on successful db query filtering is_activated=false', async () => {
                const userData1 = {
                    id: 1, 
                    username: "username1", 
                    password: "password1", 
                    email: "username1@email.com", 
                    first_name: "user1", 
                    last_name: "userlast1", 
                    phone_number: "+123user1", 
                    postal_code: "US ER1",
                    is_activated: false
                }

                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData1, userData1]});

                const result = await User.getAllNonActivated()
                expect(Object.keys(result).length).toBe(2)
                expect(Object.keys(result[0]).length).toBe(9)
                expect(typeof(result)).toBe('object')
                expect(Object.keys(result[0])).toEqual(Object.keys(userData1))
            })
            /*
            it("throws error if no users with false 'is_activated' values exit in table", () => {

                //TO DO
            }) */

        })

        describe(".isActivated() instance method", () => {
            // const User1 = require('../../models/User')
            // jest.mock('../../models/User')

            beforeEach(() => {
                jest.clearAllMocks()

            })
            // To pass the data must return result.rows from db and have 7 keys per object
            it("returns a 'true' value on successful db query filtering by username", async () => {
                const userData1 = {
                    id: 1, 
                    username: "username1", 
                    password: "password1", 
                    email: "username1@email.com", 
                    first_name: "user1", 
                    last_name: "userlast1", 
                    phone_number: "+123user1", 
                    postal_code: "US ER1",
                    is_activated: true
                }
                
                let checkUser = new User(userData1)
                jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData1]});

                const result = await checkUser.isActivated()
                expect(typeof(result)).toBe('boolean')
                expect(result).toEqual(userData1.is_activated)
            })

        })

    })
})
