## What's this about? ##
Promise based REST client for browsers implemented using fetch API and built with Babel and Gulp.
## API ##

 - get (String: resource, Object: params ) : Promise
 - getOne(String: resource, String: resourceId) : Promise
 - post(String: resource, Object: attributes) : Promise
 - put(String: resource, String: resourceId, Object: params) : Promise
 - delete(String: resource, String: resourceId) : Promise

> Every promise returns a Mixin with the method json( ) among others. For more info go to [Mozilla docs.](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## How to install ##

```batch
	npm install mp-fetch --save
```


## How to use it? ##
```html
	<script type="text/javascript" src="./node_modules/mp-fetch/lib/index.js"></script>
	<script type="text/javascript">
	var client = fetchService.init("https://jsonplaceholder.typicode.com");

    client.get("posts", {offset: 1, limit: 20})
      .then(res=>res.json())
      .then(res => console.log("response from GET",res))
      .catch(err => console.log("Error from GET", err));
    client.getOne("posts", 1)
    .then(res=>res.json())
      .then(res => console.log("response from GETONE", res))
      .catch(err => console.log("Error from GETONE", err));
    client.post("posts", {
      		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita"
    	})
    .then(res=>res.json())
      .then(res => console.log("response from POST", res))
      .catch(err => console.log("Error from POST", err));
    	client.put("posts", 1, {
      		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita"
    	})
      .then(res=>res.json())
      .then(res => console.log("response from PUT", res))
      .catch(err => console.log("Error from PUT", err));
    	client.delete("id");

    	client.delete("posts", 1)
      .then(res=>res.json())
      .then(res => console.log("response from DELETE", res))
      .catch(err => console.log("Error from DELETE", err));
	</script>
```
