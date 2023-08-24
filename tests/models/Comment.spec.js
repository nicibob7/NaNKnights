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
        suggestion_id: 1,
        comment: "this is a comment 2",
        date_posted: "2023-08-25 12:52:02.669291",
        posted_by: "bob"
    }

    const frontEndComment = {
        comment: "this is a comment 1",
        suggestion_id: 1,
        posted_by: "bob"
    }

    beforeEach(() => jest.clearAllMocks())

    describe("Comment class base tests", () => {

        it("Comment class exists", () => {
            expect(Comment).toBeDefined();
        })
    
        it("should create an instance of Comment with corresponding values that match the data source", () => {

            const newComment = new Comment(frontEndComment);
            console.log(newComment)
            expect(newComment).toBeInstanceOf(Comment);
            expect(newComment.comment).toEqual(comment1.comment);
            expect(newComment.suggestion_id).toEqual(comment1.suggestion_id);
            expect(newComment.posted_by).toEqual(comment1.posted_by);
    
        })
    
        it("The instance of Comment should only have one object and 3 items", () => {

            const newComment = new Comment(frontEndComment)
            expect(Object.keys(newComment).length).toEqual(3);
            expect(Object.values(newComment).length).toEqual(3);
        })
    })

    describe("Comment.create(data)", () => {

        it("Should return all database entry values from the newly created Comment", async () => {

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [comment1]});

            const result = await Comment.create(frontEndComment);

            expect(typeof(result)).toBe('object');
            expect(result).toEqual(comment1);

        })
    })

    // describe("Comment.getAllBySuggestionId(id)", () => {

    // })

})
