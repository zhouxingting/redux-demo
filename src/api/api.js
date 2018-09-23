import Server from './server.js';
import {Preload,plus} from '../utils/extern.js';
import {Toast} from "antd-mobile";
// console.log(Server);
class API extends Server{
  /**
   *  用途：用于用户登录
   *  @url data/AppLoginServlet.svt
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
  async login(params = {}){
    try{
      //var w = plus.nativeUI.showWaiting('正在登录...');
      Toast.loading('数据加载中...',100);
      var w = null;
      let result = await this.axios('post', 'api/rest/view/universityLine', {});
      //console.log(result);
      Toast.hide();
      w && w.close();
      if(result && result.retcode === "00"){ //result && (result.data instanceof Object) && result.retcode === "1"
        return result.data || [];
      }else{
        plus.nativeUI.toast('登录失败');
        try {
          let err = {
            tip: '登录失败',
            response: result,
            data: params,
            url: 'app/appLogin.svt',
          }
          throw err;
        }
        catch (err) {
          console.log(err);
        }
      }
    }catch(err){
      throw err;
    }
  }
  // 初始化首页天气信息
  async requestWeather(params = {}) {
    try{
      let result = await this.axios('post', 'app/appWeather.svt', params);
      if(result) {
        return result || {};
      }else{
        try {
          let err = {
            tip: '天气信息获取失败',
            response: result,
            data: params,
            url: 'app/appWeather.svt',
          }
          throw err;
        }
        catch (err) {
          console.log(err);
        }
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();