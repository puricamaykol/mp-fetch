describe("#delete( ) method", function() {
  afterEach(function() {
    fetchMock.restore();
  });
  it("should delete a resource by its id", function() {
    var resp = {
      body: {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      status: 200
    };
    fetchMock.mock({
      method: "DELETE",
      matcher: "https://jsonplaceholder.typicode.com/posts/1",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.delete("posts", 1)
     .then(res => res.json()).should.eventually.deep.equal(resp.body);
  });
  it("should send request in a RESTful style", function() {
    var resp = {
      body: {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      status: 200
    };
    fetchMock.mock({
      method: "DELETE",
      matcher: "https://jsonplaceholder.typicode.com/posts/1",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    client.delete("posts", 1).then(res => res.json());
    return fetchMock.called("https://jsonplaceholder.typicode.com/posts/1")
      .should.equal(true);
  });
  it("should reject the promise if a server error occurs", function() {
    var resp = {
      throws: 'Unexpected error',
      status: 500
    };
    fetchMock.mock({
      method: "DELETE",
      matcher: "https://jsonplaceholder.typicode.com/posts/1",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    client.delete("posts", 1).then(res => res.json());
    return client.delete("posts", 1).then(res => res.json()).should.be.rejectedWith("Unexpected error");
  });
  it("should reject promise if resource Id is null", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.delete("posts", null)
    .then(res => res.json()).should.be.rejectedWith("Error: Resource Id not defined");
  });
  it("should reject promise if resource is not a String", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.delete({"hello": "world"}).then(res => res.json())
    .should.be.rejectedWith("Error: Resource must be a String");
  });
  it("should reject promise if resource is not defined", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.delete().then(res => res.json())
    .should.be.rejectedWith("Error: Resource should be provided");
  });
});
