const axios = require('axios').default;
const queryString = require('query-string');

const axiosPython = axios.create({
	baseURL: process.env.PYTHON_BASE_URL + "/apis",
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosPython.interceptors.request.use(
  (req) => {
    return req
  },
  (err) => {
    throw err
  }
)

axiosPython.interceptors.response.use(
  (req) => {
    return req
  },
  (err) => {
    throw err
  }
)

module.exports = {
  axiosPython
}