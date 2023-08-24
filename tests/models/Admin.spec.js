const Admin = require("../../models/Admin")

const db = require('../../db/db') 


describe("'Admin' Model unit tests", () => {

    const adminUser1 = {
        id: 1,
        username: "adminBob",
        password: "203ffkdkdjdcjeoed7$$3",
        last_logged_in: "bob"
    }

    const adminUser2 = {
        id: 2,
        username: "adminJack",
        password: "203ffkdkdjdcjeoed7$$3",
        last_logged_in: "bob"
    }

    const frontEndAdmin = {
        username: "adminBob",
        password: "203ffkdkdjdcjeoed7$$3"
    }

    beforeEach(() => jest.clearAllMocks())

    describe("Admin class base tests", () => {

        it("Admin class exists", () => {
            expect(Admin).toBeDefined();
        })
    
        it("should create an instance of Admin with corresponding values that match the data source", () => {

            const newAdmin = new Admin(frontEndAdmin);

            expect(newAdmin).toBeInstanceOf(Admin);
            console.log("hit 1", newAdmin.password)
            expect(newAdmin.username).toEqual(adminUser1.username);
            expect(newAdmin.password).toEqual(adminUser1.password);
    
        })
    
        it("The instance of Admin should only have one object and 2 items", () => {

            const newAdmin = new Admin(frontEndAdmin)
            expect(Object.keys(newAdmin).length).toEqual(2);
            expect(Object.values(newAdmin).length).toEqual(2);
        })
    })

    describe("Admin.create(data)", () => {

        it("Should return all database entry values from the newly created Admin", async () => {

            jest.spyOn(db,'query').mockResolvedValue({rows: [adminUser1]});

            const result = await Admin.create(frontEndAdmin);
            console.log(result)
            expect(typeof(result)).toBe('object');
            expect(result.username).toEqual(frontEndAdmin.username);
            expect(result.password).toEqual(frontEndAdmin.password);

        })

    })


    describe("Admin.getById(id)", () => {
        //TO PASS the admin's id must be made available outside the database. currently no returns provide the id to the controller. 
        // ONCE DONE the frontEndAdmin must be changed to reflect the change
        it("Should only return the data of all admins with an id value equal to the one being queried", async () => {


            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [adminUser1]});

            const result = await Admin.getById(frontEndAdmin.id);

            // expect(typeof(result)).toBe('object');
            expect(result.id).toEqual(adminUser1.id);
            // expect(result.length).toEqual(frontEndAdmin.length);

        })

        it("Should throw new Error if number of rows for admins does not equal 1", async () => {


            let error1 = new Error("Unable to locate user")

                jest.spyOn(db, 'query').mockRejectedValue(error1)

                try {
                    const response = await Admin.getById(frontEndAdmin.id)
                } catch (error) {
                    expect(error).toBeTruthy()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate user")
                }
        })
    })

    describe("Admin.getByUsername(username)", () => {

        it("Should only return the data of all admins with a username value equal to the one being queried", async () => {


            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [adminUser1]});

            const result = await Admin.getByUsername(frontEndAdmin.username);

            expect(typeof(result)).toBe('object');
            expect(result.username).toEqual(adminUser1.username);


        })

        it("Should throw new Error if number of rows for admins does not equal 1", async () => {


            let error1 = new Error("Unable to locate user")

                jest.spyOn(db, 'query').mockRejectedValue(error1)

                try {
                    const response = await Admin.getByUsername(frontEndAdmin.username)
                } catch (error) {
                    expect(error).toBeTruthy()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Unable to locate user")
                }
        })
    })


})
