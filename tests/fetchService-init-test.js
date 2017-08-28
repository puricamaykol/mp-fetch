describe("#init( ) method", function() {
  afterEach(function() {
    fetchMock.restore();
  });
  it("should return a valid RestClient Object", function(done) {
      const client = fetchService.init("https://jsonplaceholder.typicode.com");
     client.should.be.an('object');
     client.should.have.property('get');
     client.should.have.property('getOne');
     client.should.have.property('post');
     client.should.have.property('put');
     client.should.have.property('delete');
     done();
  });
  /*it("should throw an error if fetch API is not supported by the browser", function(done) {
      delete(window.fetch);
      const err = function() { throw new Error("This browser doesn't support the fetch API"); };
      expect(fetchService.init("https://jsonplaceholder.typicode.com")).to.throw(err);
      done();
  });*/
 
});
