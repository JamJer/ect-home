import { USER_SIGNIN,USER_SIGNOUT,USER_REG,USER_KEY_ACTIVATE,USER_KEY_DEACTIVATE } from './types'
import Vue from 'Vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
var jwt = require('jsonwebtoken') // JWT for auth
const secret = 'iloveectrttrader' // JWT Server side secret key
const config = require('.../config/config.default');
const login_apiUrl = '//127.0.0.1:3001/user/login' 
const register_apiUrl = '//127.0.0.1:3001/user/register'
const keyactivate_apiUrl = '//127.0.0.1:3001/key/activate'
const keydeactivate_apiUrl = '//127.0.0.1:3001/key/deactivate'

export const UserLogin = ({ commit }, data) => {
	return new Promise((resolve, reject) => {
		Vue.http.post(config.server.url+"/user/login", data)
		.then(function (response) {
			console.log(response);
			if (!response.ok) {
				return reject(error);
			}
			if(response.data.msg == 'success'){
				var token = jwt.sign(data, secret, { 
					expiresIn: 120
				})
				commit(USER_SIGNIN, token);
			}
			return resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        return reject(error);
      });
    });
};

export const UserLogout = ({ commit }, data) => {
	commit(USER_SIGNOUT);
	window.location = '/'
};

export const UserReg = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
		Vue.http.post(config.server.url+"/user/register", data)
		.then(function (response) {
			console.log(response);
			if (!response.ok) {
				return reject(error);
			}
			if(response.data.msg == 'success'){
				var token = jwt.sign(data, secret, { 
					expiresIn: 120
				})
				commit(USER_REG, response.data.token);
			}
			return resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        return reject(error);
      });
    });
};

export const KeyActivate = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
		Vue.http.post(config.server.url+"/key/activate", data)
		.then(function (response) {
			console.log(response);
			if (!response.ok) {
				return reject(error);
			}
			return resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        return reject(error);
      });
    });
};

export const KeyDeactivate = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
		Vue.http.post(config.server.url+"/key/deactivate", data)
		.then(function (response) {
			console.log(response);
			if (!response.ok) {
				return reject(error);
			}
			return resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        return reject(error);
      });
    });
};


