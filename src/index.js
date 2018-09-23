import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './utils/setRem';
import registerServiceWorker from './registerServiceWorker';
import {ol,cancelUpdate,Preload,mui} from './utils/extern.js';

mui.plusReady(function(){
    if (window.plus != null) {
        window.plus.runtime.getProperty(window.plus.runtime.appid,function(inf){
            var vision=inf.version;
            window.plus.storage.setItem('appVision',vision) //获取版本信息
        });
    }
    Preload.quit(true);//按两次退出应用
	Preload.setColor('#0E7BE0');
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
