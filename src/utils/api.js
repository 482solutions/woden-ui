import axios from 'axios';

const host = "http://167.71.36.3:3000/api";

const urls = {
  register: `${host}/register`,
  login: `${host}/auth`,
  logout: `${host}/logout`,
  tree: `${host}/tree`,
  sharedTree: `${host}/shared/tree`,
  file: (path) => `${host}/file/${path}`,
  sharedFile: (path) => `${host}/shared/file/${path}`,
  directory: `${host}/directory`,
  permissions: (path) => `${host}/permissions/${path}`,
};

let cache = {};

const callThenWait = (fn, time) => {
  let timer;
  return async (data) => {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = undefined;
      }, time);
      cache = await fn(data);
    }
    return cache;
  }
};

const serverRequest = config => async ({ data = false, params = false } = { data: false, params: false }) => {
  try {
    const response = await axios({
      ...config,
      data: data || undefined,
      params: params || undefined,
    });
    return response;
  } catch (e) {
    if ((e.response.status === 400 || e.response.status === 500) && !e.response.data.error) {
      e.response.data = {
        error: "Check that server is running"
      };
    }
    return e.response;
  }
};

const auth = {
  register: (name, password) => {
    const sendRequest = serverRequest({
      method: 'POST',
      url: urls.register,
    });

    const data = {
      name,
      password,
    };
    return sendRequest({ data })
  },
  login: (name, password) => {
    const sendRequest = serverRequest({
      method: 'POST',
      url: urls.login,
    });

    const data = {
      name,
      password,
    };
    return sendRequest({ data })
  },
  logout: serverRequest({
    method: 'POST',
    url: urls.logout
  }),
};

const filesystem = {
  getTree: serverRequest({
    method: 'GET',
    url: urls.tree,
  }),
  getSharedTree: serverRequest({
    method: 'GET',
    url: urls.sharedTree,
  }),
  uploadFile: (path, file) => {
    const sendRequest = serverRequest({
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'PUT',
      url: urls.file(path),
    });

    console.log(file);

    const form = new FormData();
    form.append('file', file, file.name);
    return sendRequest({ data: form })
  },
  uploadSharedFile: (path, file) => {
    const sendRequest = serverRequest({
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'PUT',
      url: urls.sharedFile(path),
    });

    console.log(file);

    const form = new FormData();
    form.append('file', file, file.name);
    return sendRequest({ data: form })
  },
  downloadFile: (path) => serverRequest({
    method: 'GET',
    url: urls.file(path),
    responseType: 'blob'
  })(),
  downloadSharedFile: (path) => serverRequest({
    method: 'GET',
    url: urls.sharedFile(path),
    responseType: 'blob'
  })(),
  createDirectory: (path) => {
    const sendRequest = serverRequest({
      method: 'PUT',
      url: urls.directory
    });

    const data = {
      directory: path,
    };
    return sendRequest({ data });
  }
};

const permissions = {
  setPermissions: (path, permission) => {
    const sendRequest = serverRequest({
      method: 'PUT',
      url: urls.permissions(path),
    });
    const data = {
      [permission.type]: [permission.user],
    };
    return sendRequest({ data });
  },
  getPermissions: (path) => serverRequest({
    method: 'GET',
    url: urls.permissions(path)
  })(),
};


export default {
  ...auth,
  ...filesystem,
  ...permissions,
}
