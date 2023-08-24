const CommunityEvent = require("../../models/CommunityEvent")

const db = require('../../db/db')

describe("CommunityEvent Model unit tests", () => {

    const event1 = {
        id: 1 ,
        title: "Event 1",
        description: "This is an event",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "bob",
        location: "New York City",
        date: "2021-01-01"
    }

    const event2 = {
        id: 2 ,
        title: "Event 2",
        description: "This is an event",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "jane",
        location: "Orange County",
        date: "2021-02-01"
    }

    const frontEndEvent = {
        title: "Event 1",
        description: "This is an event",
        posted_by: "bob",
        location: "New York City",
        date: "2021-01-01"
    }

    beforeEach(() => jest.clearAllMocks())
    
    describe("CommunityEvent class base tests", () => {

        it("CommunityEvent class exists", () => {
            expect(CommunityEvent).toBeDefined();
        })

        it("should create an instance of CommunityEvent with corresponding values that match the data source", () => {
            const newCommunityEvent = new CommunityEvent(event1);

            expect(newCommunityEvent).toBeInstanceOf(CommunityEvent);
            expect(newCommunityEvent.title).toEqual(event1.title)
            expect(newCommunityEvent.date).toEqual(event1.date);
            expect(newCommunityEvent.date_posted).toEqual(event1.date_posted);
            expect(newCommunityEvent.description).toEqual(event1.description);
            expect(newCommunityEvent.location).toEqual(event1.location);
            expect(newCommunityEvent.posted_by).toEqual(event1.posted_by);

        })

        it("The instance of CommunityEvent should only have one object and 6 values", () => {
            const newCommunityEvent = new CommunityEvent(event1)
            expect(Object.keys(newCommunityEvent).length).toEqual(6);
            expect(Object.values(newCommunityEvent).length).toEqual(6);
        })
    })

    describe("CommunityEvents.getEventsByDate()", () => {

        it("Should return an array object representing rows of events in ascending order by date", async () => {

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [event1, event2]});

            const result = await CommunityEvent.getEventsByDate();

            expect(typeof(result)).toBe('object');
            expect(Object.values(result[0])).toEqual(Object.values(event1));
            expect(Object.values(result[1])).toEqual(Object.values(event2));
            
        })
    })

    describe("CommunityEvents.getEventsByTitle()", () => {

        it("Should return an array object representing rows of events in ascending order by title", async () => {

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [event1, event2]});

            const result = await CommunityEvent.getEventsByTitle();

            expect(typeof(result)).toBe('object');
            expect(Object.values(result[0])).toEqual(Object.values(event1));
            expect(Object.values(result[1])).toEqual(Object.values(event2));
            
        })
    })

    describe("CommunityEvents.getEventsAll()", () => {

        it("Should return all entries from the community_event database", async () => {

            const allEvents = [
                {
                    id: 1 ,
                    title: "Event 1",
                    description: "This is an event",
                    date_posted: "2023-08-24 12:52:02.669291",
                    posted_by: "bob",
                    location: "New York City",
                    date: "2021-01-01"
                },
                {
                    id: 2,
                    title: "Event 2",
                    description: "This is an event",
                    date_posted: "2023-08-24 12:52:02.669291",
                    posted_by: "jane",
                    location: "Orange County",
                    date: "2021-02-01"
                }
            ]

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: allEvents});

            const result = await CommunityEvent.getAll();

            expect(result.length).toEqual(allEvents.length)
            expect(typeof(result)).toBe('object');
            expect(Object.values(result[0])).toEqual(Object.values(event1));
            expect(Object.values(result[1])).toEqual(Object.values(event2));
            
        })
    })

})
