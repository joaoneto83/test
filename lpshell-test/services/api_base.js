import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = "http://192.168.248.20:8090/"
const start = "http://192.168.248.20:6090/"
let  baseURLGet = ""

export  function getAuthorization(){
return  AsyncStorage.getItem('DATA_KEY').then((response) => { return response ? response.replace(/"/g, ''): undefined })
}
export  function Authorization(item){
  baseURLGet = item
}

export const apiStart = axios.create({
  baseURL: start
});

apiStart.interceptors.request.use(async config => {
  if (baseURLGet ==  "/api/assets/asset/QR/") {
      config.headers = { 
        'Authorization': `Bearer ${await getAuthorization()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  } else {
    config.headers = { 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return config;
});

export const api = axios.create(
  {
  baseURL: baseURL,
}
);

api.interceptors.request.use(async config => {
console.log("get", await getAuthorization())

  if (await getAuthorization()) {
      config.headers = { 
        'Content-Type': 'application/json; charset=UTF-8', 
        'Authorization': `Bearer ${  await getAuthorization()}`,
      }
  }
  return config;
});

