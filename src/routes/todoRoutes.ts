import { Request, Response, Router } from "express";
const router = Router();
import { getTodosFromId } from "../controllers/todoController";

router.get("/something/:id", async ({ params, query }: Request, res: Response) => {

  // #swagger.tags = ['Todos']
        // #swagger.description = 'Endpoint to bring certain todo'
        // #swagger.parameters['id'] = { in: 'body', description: 'id of todo', type: 'string' }
        // #swagger.parameters['name'] = { in: 'query', description: 'name of todo', required: true, type: 'string' }
       //#swagger.responses[200] = { description: "Success response", schema: { $ref: "#/definitions/Todos" } }
       //#swagger.responses[400] = { description: "Todo does not exist" }
//linea 9 in: body va params en realidad. No se por que Redocly lo marca como error
  console.log("query: ", query);
  console.log("params: ", params);
  const data = getTodosFromId();
    res.json([params.id , query.name, data]);
});

router.get("/:user", ({ params }: Request, res: Response) => {
    // #swagger.tags = ['Todos']
        // #swagger.description = 'Endpoint to bring last todo'
        // #swagger.parameters['id'] = { in: 'body', description: 'ID of user', type: 'string' }
        //#swagger.responses[200] = { description: "Success response", schema: { $ref: "#/definitions/Todos" } }
       //#swagger.responses[400] = { description: "User does not exist" }
//linea 23 in: body va params en realidad. No se por que Redocly lo marca como error
res.send(params.user);
});

export default router;