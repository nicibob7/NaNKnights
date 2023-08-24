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

    // describe("Admin.getAllBySuggestionId(id)", () => {

    //     it("Should only return the data of all Admins with a id value equal to 1", async () => {


    //         jest.spyOn(db,'query').mockResolvedValueOnce({rows: AdminsSuggestionId1});

    //         const result = await Admin.getAllBySuggestionId(frontEndAdmin.id);

    //         expect(typeof(result)).toBe('object');
    //         expect(result[0].id).toEqual(result[1].id);
    //         expect(result.length).toEqual(AdminsSuggestionId1.length);

    //     })
    // })

})
