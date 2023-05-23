import axios from 'axios';
import {useEffect, useState} from 'react';
export const baseURL = 'https://datausa.io/api/data';
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('interceptors resp ==>', response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('interceptors error ==>', error);
    return Promise.reject(error);
  },
);

export const useApiCall = (endpoint: string) => {
  const [result, setResult] = useState('');
  useEffect(() => {
    getApiCall();
  }, []);

  const getApiCall = () => {
    return new Promise((resolved, reject) => {
      axiosInstance
        .get(endpoint)
        .then(response => {
          console.log('response ==>', response);
          setResult(response);
          return resolved(response);
        })
        .catch(error => {
          console.log('error ==>', error);
          return reject(error);
        });
    });
  };
  return getApiCall;
};

export default axiosInstance;
