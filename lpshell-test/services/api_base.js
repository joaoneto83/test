import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL, BASE_START } from '@env';

const baseURL = BASE_START 
const start =  BASE_URL
let  baseURLGet = ""
let  URLGet = ""


export  function getAuthorization(){
return  AsyncStorage.getItem('DATA_KEY').then((response) => { return response ? response.replace(/"/g, ''): undefined })
}

export async function  getURLBASE(){
 return URLGet = await  AsyncStorage.getItem('URL_NEW').then((response) => { return JSON.parse(response)})
 }

 export  const  URL =  { 
  'p': getURLBASE(),
  'Base':   URLGet
 } 


export const HeadersQR = async () => { 
  return {  headers:{
    'Authorization': `Bearer ${await getAuthorization()}`,
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
}

export const HeadersBase = async ()=> {
 return { headers:
{ 'Content-Type': 'application/json; charset=UTF-8', 
'Authorization': `Bearer ${ await getAuthorization()}`,}
 } 
 

}

// export const getURLBASE = async () =>{
//   return await   AsyncStorage.getItem('URL_NEW').then((response) => { return JSON.parse(response)})
//   }

export  function Authorization(item){
  baseURLGet = item
  
}

export  const apiStart = axios.create(
  {
  baseURL: getURLBASE()
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
  baseURL: BASE_START,
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

