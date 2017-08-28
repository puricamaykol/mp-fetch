
# FETCH SERVICE

Un equipo de arquitectura le ha solicitado una capa para consumo de servicios
REST basado en promesas, para ello le han recomendado que haga uso de
la tecnología fetch.

Además de ello el equipo ha solicitado la siguiente API como ejemplo de uso

```javascript
const api = ApiFactory.init("http://remote-api/v1")
```

# Obtener todos los registros de una entidad
```javascript
api.get("/feeds").then((feeds)=>{
    console.log(feeds)
}).catch((error)=> {
    console.log(error)
})
```
# Listar una entidad particular
```javascript
api.getOne("/feeds",":feedId").then((feed)=>{
    console.log(feed)
}).catch((error)=> {
    console.log(error)
})
```

# Crear una entidad

```javascript
api.post("/feeds",{
    title: "Feed title",
    timestamp: new Date(),
    description:"text",
    uri:"/a feed"
}).then((createdFeed)=>{
    console.log(createdFeed)
}).catch((error)=> {
    console.log(error)
})
```


# Editar una entidad
```javascript
api.put("/feeds","feedId",{
    title: "Edited title"
}).then((editedFeed)=>{
    console.log(editedFeed)
}).catch((error)=> {
    console.log(error)
})
```

# Eliminar una entidad
```javascript
api.delete("/feeds","feedId").then((deletedFeed)=>{
    console.log(deletedFeed)
}).catch((error)=> {
    console.log(error)
})
```

# Pasar parámetros query
```javascript
api.get("/feeds",{
    limit:20,
    offset:20,
    order: "feedId"
}).then((feeds)=>{
    console.log(feeds)
}).catch((error)=> {
    console.log(error)
});
```
-------------

## Requerimientos adicionales

* Pruebas Unitarias con servidor MOCK
* Cobertura de código con un minimo de 85% para considerarse aprobado
* Documentación API de la librería
* Programación ES6 obligatoria
* build  haciendo uso de gulp
* Debe usar babel para hacer el es6 compilante con browsers
* Es obligatorio el uso de fetch(Se prohibe el uso de xmlHTTPRequest, ó jquery ajax)