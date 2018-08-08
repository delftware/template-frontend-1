import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const env = process.env.NODE_ENV;
let API_ROOT;
if (env === "production") {
  API_ROOT = `***REPLACE_WITH_HEROKU_PRODUCTION_URL***/api`
} else {
  API_ROOT = `http://localhost:3000/api`
}

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set('authorization', `Token ${commonStore.token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: (url, query = {}) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .query(query)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  upload: (url, body, file) =>
    superagent
      .put(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .attach('file', file)
      .field('data', JSON.stringify(body))
      .end(handleErrors)
      .then(responseBody)
  };


const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: ({email, password, classYear, firstName, lastName}) =>
    requests.post('/users', { user: { email, password, classYear, firstName, lastName } }),
  save: (user, deleteImage, file) =>
    requests.upload('/user', { user, deleteImage }, file),
  resetPassword: (email) =>
    requests.post('/resetPassword', { email }),
  changePassword: (password, hash) =>
    requests.post('/changePassword', { password, hash }),
  resendVerification: () =>
    requests.post('/sendEmailVerification'),
  verifyEmail: (hash) =>
    requests.post('/verify', { hash })
};

const Account = {
  updateUser: () =>
    requests.post(`/account/upload`),
};

export default {
  Account,
  Auth,
};
