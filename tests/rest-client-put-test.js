describe("#put( ) method",function(){
  afterEach(function() {
    fetchMock.restore();
  });
  it("should modify a resource", function() {
    var resp = {
      body: 
        {
          "id": 101,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
      status: 200
    };
    fetchMock.mock({
      method: "PUT",
      matcher: "https://jsonplaceholder.typicode.com/posts/1",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put("posts",1, {
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }).then(res => res.json()).should.eventually.deep.equal(resp.body);
  });
  it("should reject promise if server error occurs", function() {
    var resp = {
      throws: "Unexpected error",
      status: 500
    };
    fetchMock.mock({
      method: "PUT",
      matcher: "https://jsonplaceholder.typicode.com/posts/1",
      response: resp
    })
      .catch(unmatchedUrl => console.log(unmatchedUrl));
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put("posts", 1,{
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }).then(res => res.json()).should.be.rejectedWith("Unexpected error")
  });
  it("should reject promise if resource Id is null", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put("posts", null,{
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }).then(res => res.json()).should.be.rejectedWith("Error: Resource Id not defined");
  });
  it("should reject promise if params are null", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put("posts", 1, null).then(res => res.json())
    .should.be.rejectedWith("Error: Params must be an Object");
  });
  it("should reject promise if params are not an object", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put("posts", 1, "limit:1, offset:10").then(res => res.json())
    .should.be.rejectedWith("Error: Params must be an Object");
  });
  it("should reject promise if resource is not a String", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put({"hello": "world"}).then(res => res.json())
    .should.be.rejectedWith("Error: Resource must be a String");
  });
  it("should reject promise if resource is not defined", function() {
    const client = fetchService.init("https://jsonplaceholder.typicode.com");
    return client.put().then(res => res.json())
    .should.be.rejectedWith("Error: Resource should be provided");
  });
});