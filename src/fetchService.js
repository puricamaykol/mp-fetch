'use strict'
const RestClient = require('./RestClient');
class fetchService {
  /**
   * Static Method that receives the base url and return a RestClient Object
   * @param  {String} baseUrl 
   * @return {<RestClient>Object}
   */
  static init(baseUrl) {
    if (typeof fetch !== 'undefined') {
      return new RestClient(baseUrl);
    } else {
      throw new Error("This browser doesn't support the fetch API")
    }
  }
}

module.exports = fetchService;