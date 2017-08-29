'use strict'
class RestClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  /**
   * Gets a list of resources
   * @param  {String} resource Name of the resource
   * @param  {JSON} params   Params used as Query String
   * @return {Promise} Array of resources or Error
   */
  get(resource, params) {
    if (resource) {
      if (typeof resource !== 'string') {
        return Promise.reject(new Error("Resource must be a String"));
      }
    }else {
        return Promise.reject(new Error("Resource should be provided"));
    }
    if (params) {
      if (typeof params !== 'object') {
        return Promise.reject(new Error("Params must be an Object"));
      }
    }
    let queryString = [];
    for (let p in params)
      if (params.hasOwnProperty(p)) {
        queryString.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
    if (queryString.length > 0) {
      return fetch(`${this.baseUrl}/${resource}?${queryString.join("&")}`);
    }
    return fetch(`${this.baseUrl}/${resource}`, {mode: 'cors'});

  }
  /**
   * Gets one resouce by its Id Ex. resource/":resourceId"
   * @param  {String} resource   Name of the resource
   * @param  {String} resourceId Id of the resouce
   * @return {Promise} JSON or Error
   */
  getOne(resource, resourceId) {
    if (resource) {
      if (typeof resource !== 'string') {
        return Promise.reject(new Error("Resource must be a String"));
      }
    }else {
        return Promise.reject(new Error("Resource should be provided"));
    }
    if (resourceId === null) {
      return Promise.reject(new Error("Resource Id not defined"));
    }
    return fetch(`${this.baseUrl}/${resource}/${resourceId}`, {mode: 'cors'});
  }
  /**
   * Creates a Resource using its atributes
   * @param  {String} resource   Name of the resource
   * @param  {JSON} attributes
   * @return {Promise}
   */
  post(resource, attributes) {
    if (resource) {
      if (typeof resource !== 'string') {
        return Promise.reject(new Error("Resource must be a String"));
      }
    }else {
        return Promise.reject(new Error("Resource should be provided"));
    }
    if (attributes === null || typeof attributes !== 'object') {
      return Promise.reject(new Error("Params must be an Object"));
    }
    let payload = attributes;
    let data = new FormData();
    data.append("json", JSON.stringify(payload));
    return fetch(`${this.baseUrl}/${resource}`,
      {
        method: "POST",
        body: data,
        mode: 'cors'
      });
  }
  /**
   * Edits a resource
   * @param  {String} resource   Name of the resource
   * @param  {String} resourceId 
   * @param  {JSON} params
   * @return {Promise}
   */
  put(resource, resourceId, params) {
    if (resource) {
      if (typeof resource !== 'string') {
        return Promise.reject(new Error("Resource must be a String"));
      }
    }else {
        return Promise.reject(new Error("Resource should be provided"));
    }
    if (resourceId == null) {
      return Promise.reject(new Error("Resource Id not defined"));
    }
    if (params == null || typeof params !== 'object') {
      return Promise.reject(new Error("Params must be an Object"));
    }

    let payload = params;
    let data = new FormData();
    data.append("json", JSON.stringify(payload));
    return fetch(`${this.baseUrl}/${resource}/${resourceId}`,
      {
        method: "PUT",
        body: data,
        mode: 'cors'
      });
  }
  /**
   * Deletes a resource by its ID
   * @param  {String} resource   Name of the resource
   * @param  {String} resourceId 
   * @return {Promise}
   */
  delete(resource, resourceId) {
    if (resource) {
      if (typeof resource !== 'string') {
        return Promise.reject(new Error("Resource must be a String"));
      }
    }else {
        return Promise.reject(new Error("Resource should be provided"));
    }
    if (resourceId === null) {
      return Promise.reject(new Error("Resource Id not defined"));
    }
    return fetch(`${this.baseUrl}/${resource}/${resourceId}`, {
      method: "DELETE",
      mode: 'cors'
    });
  }
}

module.exports = RestClient;