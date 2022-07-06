import { Router, Request, Response } from "express";
import { getPost } from "../controllers/postController";

const router = Router();

/**
 * @api {get} /posts Request publication
 * @apiName getPost
 * @apiGroup Publication
 * @apiVersion 0.2.0
 * @apiSuccess {Object} Publication Brings Selected publication
 * @apiSuccessExample Example data on success:
 * {
 * 'user': 'John Doe',
 * 'age': 6,
 * 'title': 'My first bike',
 * 'body': 'lorem ipsum sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
 * }
 */

router.get("/", async (req: Request, res: Response) => {

    // #swagger.tags = ['Posts']
        // #swagger.description = 'Endpoint to bring last post'
        //#swagger.responses[200] = { description: "Success response", schema: { $ref: "#/definitions/Posts" } }
        //#swagger.responses[400] = { description: "There is not posts yet" }
    const post = getPost();
    res.json(post);
});


export default router;
