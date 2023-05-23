import {apiUrl} from '../../Axios/apiURL';
import axiosInstance from '../../Axios/Axios';

export const loginUser = data => {
  const postData = {username: data.username, password: data.password};
  return axiosInstance
    .post(apiUrl.Login, postData)
    .then(res => {
      console.log('login res', res);
      return res;
    })
    .catch(error => {
      console.log(error);
    });
};
