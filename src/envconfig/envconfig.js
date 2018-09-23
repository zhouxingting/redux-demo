/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = 'http://51cceasy.sunsheen.cn/CCEasy/';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3000/';
}else{
  baseURL = 'http://localhost:3000/';
}


export default {imgUrl, baseURL}