
import API from '../../api/api.js';
export const LOGIN = 'LOGIN';
export const LOGIN_INPUT = 'LOGIN_INPUT';
export const HOME_INDEX = 'HOME_INDEX';
export const INIT_HOME = 'INIT_HOME';
export const WEATHER_INFO = 'WEATHER_INFO';

export function addUserInfo(userInfo) {
	return {type:LOGIN,userInfo}
}
export function getInputInfo() {
	return {type:LOGIN_INPUT}
}
export function initHome() {
	return {type:INIT_HOME}
}
export function changeHome(index,name) {
	return {
		type:HOME_INDEX,
		index:index,
		name:name
	}
}

export const getWeatherInfo = (params)=>{
	return async dispatch => {
		try{
			let result = await API.requestWeather(params);
			dispatch({
				type:WEATHER_INFO,
				weatherInfo:result
			})
		}catch(err){
			console.log(err)
		}
	}
}