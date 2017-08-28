describe("#get( ) method", function() {
  afterEach(function() {
    fetchMock.restore();
  });
  it("should get a list of the specified resource", function() {
    var resp = {
      body: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }],
      status: 200
    };
    fetchMock.mock({
      method: "GET",
      matcher: "https://jsonplaceholder.typicode.com/posts",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.get("posts").then(res => res.json()).should.eventually.deep.equal(resp.body);
  });
  it("should reject promise if server error occurs", function() {
    var resp = {
      throws: "Unexpected error",
      status: 500
    };
    fetchMock.mock({
      method: "GET",
      matcher: "https://jsonplaceholder.typicode.com/posts",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.get("posts").then(res => res.json()).should.be.rejectedWith("Unexpected error")
  });
  it("should accept params to be sent as query string", function() {
    var resp = {
      body: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }],
      status: 200
    };
    fetchMock.mock({
      method: "GET",
      matcher: "https://jsonplaceholder.typicode.com/posts?offset=0&limit=10",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    client.get("posts", {
      offset: 0,
      limit: 10
    }).then(res => res.json());

    return fetchMock.called("https://jsonplaceholder.typicode.com/posts?offset=0&limit=10")
      .should.equal(true);
  });
  it("should reject promise if params are not an object", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.get("posts", "limit:1, offset:10").then(res => res.json())
    .should.be.rejectedWith("Error: Params must be an Object");
  });
  it("should reject promise if resource is not a String", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.get({"hello": "world"}).then(res => res.json())
    .should.be.rejectedWith("Error: Resource must be a String");
  });
  it("should reject promise if resource is not defined", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.get().then(res => res.json())
    .should.be.rejectedWith("Error: Resource should be provided");
  });
});
