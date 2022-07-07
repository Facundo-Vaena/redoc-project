import { Request, Router, Response } from "express";
import todoRoutes from "./todoRoutes";
import postsRoutes from "./postsRoutes";
const swagger_output = require("../../swagger_output.json");
const router = Router();

router.get("/swagger_output.json", (req: Request, res: Response) => res.json(swagger_output));

router.get("/docs", (req: Request, res: Response) => {
    const editedDirname = __dirname.slice(0, -10) + "index.html";
    res.sendFile(editedDirname);
})

router.use("/todos", todoRoutes);

router.use("/posts", postsRoutes);

export default router;
