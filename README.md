<p align="center">
  <a href="https://example.com/">
    <img src="https://plugins.jetbrains.com/files/12822/67275/icon/META-INF_pluginIcon.png" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Swagger, Redoc & Swagger-Autogen</h3>

  <p align="center">
    Implementación de Swagger y Redoc, para la autogeneración de documentación, en un servidor de Express
    <br>
    <!-- <a href="https://reponame/issues/new?template=bug.md">Report bug</a> -->
    <!-- · -->
    <!-- <a href="https://reponame/issues/new?template=feature.md&labels=feature">Request feature</a> -->
  </p>
</p>


## Tabla de contenidos

- [Instalación](#instalación)
- [Creación de archivos](#creación-de-archivos)
- [App](#app)
- [Swagger](#swagger)
- [Redoc Template](#redoc-template)
- [Especificaciones por ruta](#especificaciones-por-ruta)
- [Último paso](#último-paso)

## Instalación

```
    npm i swagger-ui-express
    npm i swagger-autogen
```

## Creación de archivos

Crear los siguientes archivos:

- Archivo Json (aquí se generará el código de openapi de Swagger)
- Archivo Js (para la configuración de Swagger)
- Archivo html (para el template de Redoc)
```
swagger_output.json
swagger.js
redocTemplate.html
```

## App

En el archivo de creación del server, usualmente llamado app.ts:
```
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json
...
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

```

## Swagger
En el archivo creado para la configuración de Swagger:

```
const swaggerAutogen = require("swagger-autogen")(); ---> librería para la autogeneración de documentación 
const outputFile = "./swagger_output.json"; ---> Archivo destino del código autogenerado
const endpoints = ["./src/routes/index.ts"]; ---> Path del archivo general de rutas
```
```
const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "some description"
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [                               ---> Carpetas donde se va a agrupar la información individual de cada ruta
    {
      name: "Todos",
      description: "Endpoints that exposes to dos info",
    },
    {
      name: "Posts",
      description: "Endpoints that exposes posts",
    },
  ],
  definitions: {                        ---> Esquemas para especificar el output de cada ruta
    Todos: {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    Posts: {
      userId: 2,
      id: 2,
      title:
        "sunt aut facere",
    },
  },
};
```
```
swaggerAutogen(outputFile, endpoints, doc) ---> Ejecución de swaggerAutogen especificando el archivo de destino, los endpoints y la configuración de Swagger
```

## Redoc Template
En el archivo html creado (código extraído de "Deployment", en <https://www.npmjs.com/package/redoc>):

```
<!DOCTYPE html>
<html>
  <head>
    <title>ReDoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='./swagger_output.json'></redoc> --->  !! Path del output de Swagger (archivo Json) !!
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
  </body>
</html>
```

# Especificaciones por ruta
Añadir información específica de cada ruta (descripción, tag al que pertenece, contenido de body y params, tipos de datos, ejemplo de respuesta exitosa, ejemplo de respuesta fallida, etc)

```
router.get("/:user", ({ params }: Request, res: Response) => {
    // #swagger.tags = ['Todos']
        // #swagger.description = 'Endpoint to bring last todos from user'
        // #swagger.parameters['id'] = { in: 'params', description: 'ID of user', type: 'string' }
        //#swagger.responses[200] = { description: "Success response", schema: { $ref: "#/definitions/Todos" } }
       //#swagger.responses[400] = { description: "User does not exist" }
  const { user: userId } = params;
  const fetchedTodos = findTodosFromUser(userId);
  res.json(fetchedTodos);
});
```
# Último paso
Para terminar, es necesario agregar el siguiente script en el archivo package.json, el cual ejecutará el archivo de configuración de Swagger (swagger.js):
```
    "swagger-autogen": "ts-node swagger.js"
```
Total de scripts de package.json:
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node ./src/app.ts",
    "swagger-autogen": "ts-node swagger.js"
  },
```
<p>Para mantener la documentación actualizada, será necesaria la ejecución de este script siempre que se realicen cambios en las rutas.</p>
