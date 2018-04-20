import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import _ from 'lodash';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4567',
  responseType: 'json',
});

function buildErrorMessage(errors) {
  if (_.isEmpty(errors)) return null;
  const transformer = ({ code, message }) => (global.__DEV__ ? `${code} - ${message}` : message);
  return _.map(errors, transformer).join(', ');
}

export default axiosMiddleware(axiosClient, {
  errorSuffix: ':ERROR',
  interceptors: {
    response: [{
      error: (configs, request) => {
        const { dispatch } = configs;
        const { request: { response: { errors } = {}, status } = {} } = request;
        const message = buildErrorMessage(errors) || request.message;

        // if (status === 401)
        //   dispatch(auth.deauthorize());

        return Promise.reject({ ...request, message });
      },
      success: (configs, request) => {
        const { config: { logging } = {} } = request;
        // if (logging) Logger.debug(request);
        return request;
      },
    }],
  },
  successSuffix: ':SUCCESS',
});
