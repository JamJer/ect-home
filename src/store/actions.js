import { USER_SIGNIN,USER_SIGNOUT,USER_REG } from './types'
import Vue from 'Vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
var jwt = require('jsonwebtoken') // JWT for auth
const secret = 'iloveectrttrader' // JWT Server side secret key
const login_apiUrl = '//127.0.0.1:3001/user/login' 
const register_apiUrl = '//127.0.0.1:3001/user/register'

export const UserLogin = ({ commit }, data) => {
	return new Promise((resolve, reject) => {
		Vue.http.post(login_apiUrl, data)
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
		Vue.http.post(register_apiUrl, data)
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

