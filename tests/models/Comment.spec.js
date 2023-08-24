const Comment = require("../../models/Comment")

const db = require('../../db/db')

describe("'Comment' Model unit tests", () => {

    const comment1 = {
        id: 1,
        suggestion_id: 1,
        comment: "this is a comment 1",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "bob"
    }

    const comment2 = {
        id: 2,
        suggestion_id: 2,
        comment: "this is a comment 2",
        date_posted: "2023-08-25 12:52:02.669291",
        posted_by: "bob"
    }

    const frontEndComment = {
        comment: "this is a comment 1",
        date_posted: "2023-08-24 12:52:02.669291",
        posted_by: "bob"
    }

    beforeEach(() => jest.clearAllMocks())

    describe("Comment class base tests", () => {

        it("Comment class exists", () => {
            expect(Comment).toBeDefined();
        })
    
        it("should create an instance of Comment with corresponding values that match the data source", () => {
            const newCommemnt = new Comment(comment1);
    
            expect(newComment).toBeInstanceOf(Comment);
            expect(newComment.date_posted).toEqual(comment1.date_posted);
            expect(newComment.comment).toEqual(comment1.comment);
            expect(newComment.posted_by).toEqual(comment1.posted_by);
    
        })
    
        it("The instance of CommunityEvent should only have one object and 6 values", () => {
            const newComment = new CommunityEvent(comment1)
            expect(Object.keys(newComment).length).toEqual(3);
            expect(Object.values(newComment).length).toEqual(3);
        })
    })

})
