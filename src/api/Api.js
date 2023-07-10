import axios from 'axios'

const SERVER_URL = 'http://localhost:3000/api';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// (C)reate
async function createNew(resource, data) {
    try {
      const response = await axios.post(SERVER_URL + '/' + resource, data);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }
};

// (R)ead
async function getAll(resource) {
    try {
      const response = await axios.get(SERVER_URL + '/' + resource);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }
};
async function getOne(resource, id) {
    try {
      const response = await axios.get(SERVER_URL + '/' + resource + '/' + id);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }
};

// (U)pdate
async function updateForId(resource, data) {
    try {
      const response = await axios.put(SERVER_URL + '/' + resource, data);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }
};

// (D)elete
async function removeForId(resource, id) {
    try {
      const response = await axios.delete(SERVER_URL + '/' + resource + '/' + id);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }
};
async function removeForAll(resource) {
  return this.execute('DELETE', resource)
    try {
      const response = await axios.delete(SERVER_URL + '/' + resource);
      return response.data;
    } 
    catch (e) {
      errors = [];
      return errors.push(e);
    }

};

// Get all apps
async function getApps() {
  try {
    const response = await axios.get('http://localhost:3000/apps');
    return response.data;
  } 
  catch (e) {
    errors = [];
    return errors.push(e);
  }
};

export default {
  createNew,
  getOne,
  getAll,
  updateForId,
  removeForId,
  removeForAll,
  getApps,
  
  getOneId: async function(resource, id) {
    try {
      const response = await axios.get(SERVER_URL + '/' + resource + '/' + id);
      return response.data;
    } catch (e) {
      errors = [];
      return errors.push(e);
    }
  },

  // To use async in VueJS: https://stackoverflow.com/questions/46389267/using-async-await-with-webpack-simple-configuration-throwing-error-regeneratorr
  async execute(method, resource, data, config) {
    return instance({
      method: method,
      url: resource,
      data,
      ...config
    })
  },

  // (C)reate
  // createNew(resource, data) {
  //   return this.execute('POST', resource, data)
  // },

  // (R)ead
  // getAll(resource) {
  //   return this.execute('GET', resource, null, {
  //     transformResponse: [function (data) {
  //       return data ? JSON.parse(data)._embedded.$resource : data;
  //     }]
  //   })
  // },
  // getOne(resource, id) {
  //   return this.execute('GET', resource + '/' + id, null, {
  //     transformResponse: [function (response) {
  //       return JSON.parse(response);
  //     }]
  //   })
  // },

  // (U)pdate
  // updateForId(resource, data) {
  //   return this.execute('PUT', resource, data)
  // },

  // (D)elete
  // removeForId(resource, id) {
  //   return this.execute('DELETE', resource + '/' + id)
  // },
  // removeForAll(resource) {
  //   return this.execute('DELETE', resource)
  // }
}
