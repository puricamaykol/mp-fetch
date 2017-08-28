const fetchService = require('../src');
const client = fetchService.init("https://jsonplaceholder.typicode.com");

client.get("posts", {offset: 1, limit: 20})
  .then(res => console.log(res))
  .catch(err => console.log("Error from GET", err));
client.getOne("posts", 1)
  .then(res => console.log("response from GETONE", res))
  .catch(err => console.log("Error from GETONE", err));
client.post("posts", {
  		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita"
	})
  .then(res => console.log("response from POST", res))
  .catch(err => console.log("Error from POST", err));
	client.put("posts", 1, {
  		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita"
	})
  .then(res => console.log("response from PUT", res))
  .catch(err => console.log("Error from PUT", err));
	client.delete("id");

	client.delete("posts", 1)
  //.then(res => res.json())
  .then(res => console.log("response from DELETE", res))
  .catch(err => console.log("Error from DELETE", err));

