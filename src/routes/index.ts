import { Request, Router, Response } from "express";
import todoRoutes from "./todoRoutes";
import postsRoutes from "./postsRoutes";
const router = Router();

// router.get("/", (req: Request, res:Response) => {
//     res.send("Ok2")
// })
router.use("/todos", todoRoutes);

// router.get("/posts", (req: Request, res: Response) => {
//     console.log("entre1")
//     res.send("ok3");
// });

router.use("/posts", postsRoutes);

export default router;

// module.exports = function (app: any) {
//     app.get("/", (req: Request, res: Response) => res.send("Ok"));
// }