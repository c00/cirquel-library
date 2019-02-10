import { EnvironmentBase } from './environment.base';

//const ip = "172.16.221.166";
//const ip = "192.168.1.46";
const ip = "127.0.0.1";

/* export const environment: EnvironmentBase = {
  production: false,
  api: `http://${ip}/cirque/cirque-api/src/public/`,
  itemImgRoot: `http://${ip}/cirque/user-images/`, 
  environment: 'Test'
}; */

export const environment: EnvironmentBase = {
  production: false,
  api: 'https://api.cirquelapp.com/',
  itemImgRoot: 'https://images.cirquelapp.com/',
  environment: 'Test'
};
